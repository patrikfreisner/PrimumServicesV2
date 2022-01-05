import React, { createContext, useContext, useState } from 'react'

import UserRegistrationService from '../assets/js/user-registration-service'

var _userRegistrationService = new UserRegistrationService()

export const RegisterContext = createContext()
RegisterContext.displayName = 'RegisterContext'

export const RegisterProvider = ({ children }) => {
  const [userRegistrationData, setUserRegistrationData] = useState({})
  const [isRegistrationInProgress, setIsRegistrationInProgress] = useState({})

  return (
    <RegisterContext.Provider
      value={{
        userRegistrationData,
        setUserRegistrationData,
        isRegistrationInProgress,
        setIsRegistrationInProgress
      }}
    >
      {children}
    </RegisterContext.Provider>
  )
}

export const useRegisterContext = () => {
  const {
    userRegistrationData,
    setUserRegistrationData,
    isRegistrationInProgress,
    setIsRegistrationInProgress
  } = useContext(RegisterContext)

  function registerNewUser(userData, callback) {
    _userRegistrationService.register(userData, props => {
      callback(props)
    })
  }

  return {
    userRegistrationData,
    setUserRegistrationData,
    isRegistrationInProgress,
    setIsRegistrationInProgress,
    registerNewUser
  }
}
