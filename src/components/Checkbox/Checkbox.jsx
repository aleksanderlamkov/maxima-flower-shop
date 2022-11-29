import React from 'react'
import './Checkbox.css'

const Checkbox = (props) => {
  const {
    className = '',
    name,
    id = name,
    isChecked = false,
    onChange,
    label,
    error = '',
  } = props

  const hasError = Boolean(error)

  return (
    <label className={`${className} checkbox`}>
      <input
        className={`checkbox__control visually-hidden ${hasError ? 'is-invalid' : ''}`}
        id={id}
        name={name}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
      <span className="checkbox__emulator" />
      <span className="checkbox__label">{label}</span>
      {hasError && <div className="error">{error}</div>}
    </label>
  )
}

export default Checkbox