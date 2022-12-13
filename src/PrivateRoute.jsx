import React from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'

const PrivateRoute = (props) => {
  const { children } = props
  const user = useSelector(({ user }) => user)
  const isAuth = user.email

  return isAuth
    ? children
    : <Navigate to="/sign-in" />
}

export default PrivateRoute
