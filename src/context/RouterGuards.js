import React from 'react'
import LoginComponent from '../components/Authentication/Login/Login'

// Context
import { useLoginContext } from './LoginContext'

export const PrivateOutlet = ({ location }) => {
  const { isAuthenticated } = useLoginContext()

  return isAuthenticated ? (
    <>
      {/* <Outlet /> */}
    </>
  ) : (
    <NavigationContainer ref={LoginComponent}>{/* ... */}</NavigationContainer>
  )
}
