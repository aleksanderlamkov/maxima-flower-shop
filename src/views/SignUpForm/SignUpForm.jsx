import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import UserForm from '../UserForm/UserForm'

const SignUpForm = () => {
  return (
    <UserForm
      formType="signUp"
      fetchFirebase={createUserWithEmailAndPassword}
      fetchFirebaseSuccessStatus="Registration is successful. Welcome!"
      submitButtonLabel="Sign Up"
    />
  )
}

export default SignUpForm