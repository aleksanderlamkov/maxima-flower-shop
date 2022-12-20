import React from 'react'
import './Footer.css'

const Footer = (props) => {
  const {
    className = '',
  } = props

  return (
    <footer className={`${className} footer`}>
      FOOTER
      <a href="https://aleksanderlamkov.ru/" target="_blank">MySite</a>
    </footer>
  )
}

export default Footer