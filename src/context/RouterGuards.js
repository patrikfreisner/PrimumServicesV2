import React from 'react'
import { Navigate, Outlet } from 'react-router'

// Context
import { useLoginContext } from './LoginContext'

// Components
import Navigation from '../Components/NavigationToolbar/Navigation'

export const PrivateOutlet = ({ location }) => {
  const { isAuthenticated } = useLoginContext()

  return isAuthenticated ? (
    <>
      <Navigation />
      <Outlet />
    </>
  ) : (
    <Navigate to={{ pathname: 'login', state: { from: location } }} />
  )
}
