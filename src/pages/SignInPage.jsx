import React from 'react'
import { NavLink } from 'react-router-dom'

const SignUpPage = () => {
  return (
    <>
      <h1>Sign In</h1>
      <p>I don't have an account :(</p>
      <p><NavLink to="/sign-up">Register me</NavLink></p>
    </>
  )
}

export default SignUpPage