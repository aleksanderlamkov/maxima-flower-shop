import React, { useState } from 'react'
import Input from '../../components/Input/Input'
import './SignUpForm.css'
import isEmailValid from '../../utils/isEmailValid'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/slices/userSlice'

const SignUpForm = () => {
  const passwordMinLength = 8

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ emailError, setEmailError ] = useState('')

  const [ password, setPassword ] = useState('')
  const [ passwordError, setPasswordError ] = useState('')

  const [ passwordRepeat, setPasswordRepeat ] = useState('')
  const [ passwordRepeatError, setPasswordRepeatError ] = useState('')

  const validate = () => {
    let hasError = false

    if (isEmailValid(email)) {
      setEmailError('')
    } else {
      setEmailError('Incorrect email')
      hasError = true
    }

    if (password.length >= passwordMinLength) {
      setPasswordError('')
    } else {
      setPasswordError(`Password must me at least ${passwordMinLength} symbols!`)
      hasError = true
    }

    if (passwordRepeat === password) {
      setPasswordRepeatError('')
    } else {
      setPasswordRepeatError('Passwords must be equal!')
      hasError = true
    }

    return !hasError
  }

  const signUp = () => {
    const auth = getAuth()

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const { user } = response
        const { email, uid, accessToken } = user

        dispatch(setUser({
          email,
          token: accessToken ?? null,
          id: uid,
        }))
        // navigate('/', { replace: true })
      })
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const isValid = validate()

    if (isValid) {
      signUp()
    }
  }

  return (
    <form className="sign-up-form" onSubmit={onSubmit}>
      <div className="sign-up-form__item">
        <Input
          name="email"
          type="email"
          placeholder="example@mail.com"
          label="Email"
          value={email}
          error={emailError}
          isLabelHidden={false}
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>

      <div className="sign-up-form__item">
        <Input
          name="password"
          type="password"
          placeholder="Your password"
          label="Password"
          value={password}
          error={passwordError}
          isLabelHidden={false}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <div className="sign-up-form__item">
        <Input
          name="passwordRepeat"
          type="password"
          placeholder="Repeat your password"
          label="Password repeat"
          value={passwordRepeat}
          error={passwordRepeatError}
          isLabelHidden={false}
          onChange={({ target }) => setPasswordRepeat(target.value)}
        />
      </div>

      <div className="sign-up-form__item">
        <button type="submit">Sign Up</button>
      </div>
    </form>
  )
}

export default SignUpForm