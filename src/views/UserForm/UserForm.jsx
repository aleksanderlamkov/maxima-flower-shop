import React, { useState } from 'react'
import Input from '../../components/Input/Input'
import isEmailValid from '../../utils/isEmailValid'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/slices/userSlice'
import { addStatus } from '../../store/slices/statusesSlice'
import './UserForm.css'

/** Возможные статусы ошибок */
const errorCodes = {
  emailAlreadyInUse: 'auth/email-already-in-use',
  userNotFound: 'auth/user-not-found',
  wrongPassword: 'auth/wrong-password',
  tooManyRequests: 'auth/too-many-requests',
}

const UserForm = (props) => {
  const {
    /**
     * Тип формы:
     * 'signUp' (регистрация)
     * 'signIn' (авторизация)
     */
    formType,
    /**
     * Функция 'firebase' для запроса:
     * 'createUserWithEmailAndPassword' (регистрация)
     * 'signInWithEmailAndPassword' (авторизация)
     */
    fetchFirebase,
    /**
     * Текст, выводимый в статус-бар после
     * успешного ответа на отправленный запрос
     */
    fetchFirebaseSuccessStatus,
    /** Текст на кнопке отправки формы */
    submitButtonLabel,
  } = props

  const isSignUpForm = formType === 'signUp'
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

    if (isSignUpForm) {

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

    } else {

      if (password.length > 0) {
        setPasswordError('')
      } else {
        setPasswordError(`Password can't be empty!`)
        hasError = true
      }

    }

    return !hasError
  }

  const makeRequest = () => {
    const auth = getAuth()

    fetchFirebase(auth, email, password)
      .then((response) => {
        const { user } = response
        const { email, uid, accessToken } = user

        dispatch(setUser({
          email,
          token: accessToken,
          id: uid,
        }))
        dispatch(addStatus({ label: fetchFirebaseSuccessStatus }))
        navigate('/', { replace: true })
      })
      .catch(({ code }) => {
        let label

        switch (code) {
          case (errorCodes.emailAlreadyInUse): {
            label = `Email '${email}' is already use! Please, use another email address.`
            setEmailError(label)
            break
          }
          case (errorCodes.tooManyRequests): {
            label = 'Too many attempts. Please, try again a bit later!'
            break
          }
          case (errorCodes.wrongPassword): {
            label = "Password is wrong!"
            setPasswordError(label)
            break
          }
          case (errorCodes.userNotFound): {
            label = `User with email '${email}' is not found!`
            setEmailError(label)
            break
          }
          default: {
            label = 'Something went wrong. Please, try again a bit later!'
            break
          }
        }

        dispatch(addStatus({ label }))
      })
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const isValid = validate()

    if (isValid) {
      makeRequest()
    }
  }

  return (
    <form className="user-form" onSubmit={onSubmit}>
      <div className="user-form__item">
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

      <div className="user-form__item">
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

      {isSignUpForm && (
        <div className="user-form__item">
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
      )}

      <div className="user-form__item">
        <button type="submit">{submitButtonLabel}</button>
      </div>
    </form>
  )
}

export default UserForm