import React from 'react'
import './Container.css'

const Container = (props) => {
  const {
    className = '',
    children,
  } = props

  return (
    <div className={`${className} container`}>
      {children}
    </div>
  )
}

export default Container