import React, { createContext, useState, useContext, useEffect } from 'react'

import UserLoginService from '../assets/js/user-login-service'
import CognitoService from '../assets/js/cognito-service'
import { Outlet } from 'react-router'

const _loginService = new UserLoginService()
const _cognitoService = new CognitoService()

export const LoginContext = createContext()
LoginContext.displayName = 'LoginContext'

export const LoginProvider = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState({})

  return (
    <LoginContext.Provider
      value={{
        userData,
        setUserData,
        isAuthenticated,
        setIsAuthenticated,
        isAuthenticating,
        setIsAuthenticating
      }}
    >
      <Outlet />
    </LoginContext.Provider>
  )
}

export const useLoginContext = () => {
  const {
    userData,
    setUserData,
    isAuthenticated,
    setIsAuthenticated,
    isAuthenticating,
    setIsAuthenticating
  } = useContext(LoginContext)

  // Authenticate
  function authenticate(user, passw, callback) {
    _loginService.authenticate(user, passw, (evt, response) => {
      // _loginService.isAuthenticated((evt, response) => {
      setIsAuthenticated(response)
      setUserData(_cognitoService.getCurrentUserData())
      if (callback) {
        callback(evt, response)
      }
      // })
    })
  }

  // Check if is authenticated
  function checkIsAuthenticated(callback) {
    _loginService.isAuthenticated((msg, isAuthenticated) => {
      if (isAuthenticated === true) {
        setIsAuthenticated(isAuthenticated);

        callback(isAuthenticated);
      }
    });
  }

  // Logout
  function logout() {
    try {
      _loginService.logout()
    } catch (e) {
      console.log(e)
    } finally {
      setIsAuthenticated(false)
      setUserData({})
    }
  }

  useEffect(() => {
    if (isAuthenticated === true) {
      setUserData(_cognitoService.getCurrentUserData())
    }
  }, [isAuthenticated, setUserData])

  return {
    userData,
    setUserData,
    isAuthenticated,
    setIsAuthenticated,
    isAuthenticating,
    setIsAuthenticating,
    checkIsAuthenticated,
    authenticate,
    logout
  }
}