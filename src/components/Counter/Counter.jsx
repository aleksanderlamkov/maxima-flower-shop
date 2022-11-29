import React from 'react'
import './Counter.css'

const Counter = (props) => {
  const {
    className = '',
    value,
    onDecrease,
    onIncrease,
  } = props

  return (
    <div className={`${className} counter`}>
      <button
        className="counter__button counter__button--decrease"
        type="button"
        title="Decrease amount"
        onClick={onDecrease}
      >
        –
      </button>
      <div className="counter__value">{value}</div>
      <button
        className="counter__button counter__button--increase"
        type="button"
        title="Increase amount"
        onClick={onIncrease}>
        +
      </button>
    </div>
  )
}

export default Counter