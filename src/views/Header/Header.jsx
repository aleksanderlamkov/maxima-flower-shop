import React from 'react'
import Container from '../../components/Container/Container'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../../store/slices/userSlice'
import './Header.css'

const defaultMenuItems = [
  {
    href: '/',
    label: 'Home',
    reloadDocument: true,
  },
  {
    href: '/basket',
    label: 'Basket',
  },
  {
    href: '/feedback',
    label: 'Feedback',
  },
]

const Header = (props) => {
  const {
    className = '',
    menuItems = defaultMenuItems,
  } = props

  /** Получаем данные редьюсера 'user' из стора */
  const user = useSelector(({ user }) => user)
  /**
   * Для использования методов редьюсера
   * нам понадобится функция-прослойка 'dispatch'
   **/
  const dispatch = useDispatch()

  const userEmail = user.email
  /**
   * Для проверки статуса авторизации пользователя
   * проверим значение 'email' с начальным значением 'null'
   **/
  const isAuth = userEmail !== null

  /**
   * При клике на кнопку логаута (выйти из аккаунта),
   * вызываем метод редьюсера 'user' - 'logOutUser'
   * через функцию-прослойку 'dispatch'
   */
  const onUserLogOutButtonClick = () => {
    dispatch(logOutUser())
  }

  return (
    <header className={`${className} header`}>
      <Container className="header__inner">
        <nav className="header__menu">
          <ul className="header__menu-list">
            {menuItems.map(({ href, label, reloadDocument }) => (
              <li className="header__menu-item" key={label}>
                <NavLink
                  className={({ isActive }) => {
                    return `header__menu-link ${isActive ? 'is-active' : ''}`
                  }}
                  to={href}
                  reloadDocument={reloadDocument}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__user">
          {isAuth ? (
            <>
              <div className="header__user-name">{userEmail}</div>
              <button
                className="header__user-log-out-button"
                type="button"
                title="Sign Out"
                onClick={onUserLogOutButtonClick}
              >
                <svg width="471" height="404" viewBox="0 0 471 404" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M59.7354 208.315L248.642 349.435C253.121 353.169 260.59 349.435 260.59 343.461L260.585 261.33C260.585 257.596 263.569 253.861 268.054 253.861H462.934C466.668 253.861 470.402 250.877 470.402 246.392V141.862C470.402 138.127 467.418 134.393 462.934 134.393H267.307C263.572 134.393 259.838 131.409 259.838 126.924V59.7268C259.838 53.7528 253.119 50.0185 247.89 53.7528L59.7302 196.366C55.9958 199.356 55.9958 205.33 59.7302 208.314L59.7354 208.315ZM0.000762939 298.664V104.531C0.000762939 47.036 47.0421 0 104.531 0H238.931V29.864H104.531C63.4634 29.864 29.8647 63.4627 29.8647 104.531V298.664C29.8647 339.732 63.4634 373.331 104.531 373.331H238.931V403.195H104.531C47.0367 403.195 0.000762939 356.153 0.000762939 298.664Z" fill="black"/>
                </svg>
              </button>
            </>
          ) : (
            <>
              <NavLink
                className="header__user-sign-in-link"
                to="/sign-in"
                title="Sign In"
                aria-label="Sign In"
              >
                <svg width="472" height="404" viewBox="0 0 472 404" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M411.534 209.12L222.627 350.24C218.148 353.975 210.68 350.24 210.68 344.266L210.685 262.136C210.685 258.401 207.7 254.667 203.216 254.667H8.33598C4.60158 254.667 0.867188 251.682 0.867188 247.198V142.667C0.867188 138.933 3.85158 135.199 8.33598 135.199H203.963C207.697 135.199 211.431 132.214 211.431 127.73V60.5325C211.431 54.5585 218.15 50.8242 223.379 54.5585L411.539 197.172C415.274 200.161 415.274 206.135 411.539 209.12L411.534 209.12ZM471.269 299.47V105.336C471.269 47.8417 424.227 0.805664 366.738 0.805664H232.338V30.6697H366.738C407.806 30.6697 441.405 64.2683 441.405 105.336V299.47C441.405 340.538 407.806 374.136 366.738 374.136H232.338V404H366.738C424.233 404 471.269 356.959 471.269 299.47V299.47Z" fill="black"/>
                </svg>
              </NavLink>
            </>
          )}
        </div>
      </Container>
    </header>
  )
}

export default Header