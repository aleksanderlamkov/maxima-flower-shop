import React, { useState } from 'react'
import Input from '../../components/Input/Input'
import Checkbox from '../../components/Checkbox/Checkbox'
import isEmailValid from '../../utils/isEmailValid'
import './FeedbackForm.css'
import Radios from '../../components/Radios/Radios'
import Select from '../../components/Select/Select'
import FileAttach from '../../components/FileAttach/FileAttach'

const FeedbackForm = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')

  const [message, setMessage] = useState('')
  const [messageError, setMessageError] = useState('')

  const [agreement, setAgreement] = useState(false)
  const [agreementError, setAgreementError] = useState('')

  const [country, setCountry] = useState('russia')

  const validate = () => {
    let hasError = false

    if (isEmailValid(email)) {
      setEmailError('')
    } else {
      setEmailError('Incorrect email')
      hasError = true
    }

    if (name.length) {
      setNameError('')
    } else {
      setNameError('Required field!')
      hasError = true
    }

    if (message.length) {
      setMessageError('')
    } else {
      setMessageError('Required field!')
      hasError = true
    }

    if (agreement) {
      setAgreementError('')
    } else {
      setAgreementError('Required field!')
      hasError = true
    }

    return !hasError
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const isValid = validate()

    if (isValid) {
      const formNode = event.target
      const formData = new FormData(formNode)
      const formDataFormatted = Object.fromEntries(formData)

      console.debug(formDataFormatted)
    }
  }
  
  return (
    <form className="feedback-form" onSubmit={onSubmit}>
      <div className="feedback-form__item">
        <Input
          name="email"
          type="email"
          placeholder="example@mail.com"
          label="Email"
          value={email}
          error={emailError}
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>

      <div className="feedback-form__item">
        <Input
          name="name"
          placeholder="Ivan Ivanov"
          label="Name"
          value={name}
          error={nameError}
          onChange={({ target }) => setName(target.value)}
        />
      </div>

      <div className="feedback-form__item">
        <Input
          name="message"
          type="textarea"
          placeholder="Your message"
          label="Message"
          value={message}
          error={messageError}
          onChange={({ target }) => setMessage(target.value)}
        />
      </div>

      <div className="feedback-form__item">
        <Checkbox
          name="agreement"
          label="I agree with terms"
          isChecked={agreement}
          error={agreementError}
          onChange={({ target }) => setAgreement(target.checked)}
        />
      </div>

      <div className="feedback-form__item">
        <Radios
          name="gender"
          label="Choose your gender:"
          items={[
            {
              value: 'male',
              label: 'Male',
              isChecked: true,
            },
            {
              value: 'female',
              label: 'Female',
            },
          ]}
        />
      </div>

      <div className="feedback-form__item">
        <Select
          label="Choose your country"
          name="country"
          value={country}
          options={[
            {
              value: 'russia',
              label: 'Russia',
            },
            {
              value: 'poland',
              label: 'Poland',
            },
            {
              value: 'china',
              label: 'China',
            },
          ]}
          onChange={setCountry}
        />
      </div>

      <div className="feedback-form__item">
        <FileAttach
          name="file"
        />
      </div>

      <div className="feedback-form__item">
        <button type="submit">
          Send
        </button>
      </div>
    </form>
  )
}

export default FeedbackForm