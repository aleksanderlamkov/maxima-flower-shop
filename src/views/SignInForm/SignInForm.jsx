import React from 'react'
import { signInWithEmailAndPassword } from "firebase/auth"
import UserForm from '../UserForm/UserForm'

const SignInForm = () => {
  return (
    <UserForm
      formType="signIn"
      fetchFirebase={signInWithEmailAndPassword}
      fetchFirebaseSuccessStatus="Auth is successful. Welcome!"
      submitButtonLabel="Sign In"
    />
  )
}

export default SignInForm