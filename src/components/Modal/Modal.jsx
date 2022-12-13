import './Modal.css'
import { useEffect } from 'react'

const Modal = (props) => {
  const {
    children,
    isOpen,
    setIsOpen,
  } = props

  const onClick = (event) => {
    const isClickInside = event.target.closest('.modal__inner')

    setIsOpen(isClickInside)
  }

  const onCloseButtonClick = () => {
    setIsOpen(false)
  }

  let className = 'modal'

  if (isOpen) {
    className += ' is-open'
  }

  const onKeyDown = (event) => {
    const isEscapePressed = event.key === 'Escape'
    if (isEscapePressed) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', isOpen)
  }, [isOpen])

  return (
    <div className={className} onClick={onClick}>
      <div className="modal__inner">
        {children}
      </div>
      <button
        className="modal__close-button"
        type="button"
        onClick={onCloseButtonClick}
      >
        X
      </button>
    </div>
  )
}

export default Modal