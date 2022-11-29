import React from 'react'
import './Footer.css'

const Footer = (props) => {
  const {
    className = '',
  } = props

  return (
    <footer className={`${className} footer`}>
      FOOTER
    </footer>
  )
}

export default Footer