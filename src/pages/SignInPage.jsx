import React from 'react'
import { NavLink } from 'react-router-dom'
import SignInForm from '../views/SignInForm/SignInForm'

const SignUpPage = () => {
  return (
    <>
      <h1>Sign In</h1>
      <SignInForm />
      <p>I don't have an account :(</p>
      <p><NavLink to="/sign-up">Register me</NavLink></p>
    </>
  )
}

export default SignUpPage