import React from 'react'
import { useSelector } from 'react-redux'
import './StatusBar.css'

const StatusBar = () => {
  const items = useSelector(({ statuses }) => statuses.items)

  /**
   * После окончания CSS-анимации можно отловить момент
   * через событие 'onAnimationEnd'
   */
  const onLabelAnimationEnd = ({ target }) => {
    /**
     * Когда анимация закончена,
     * удаляем элемент 'status-bar__label'
     */
    target.remove()
  }

  /** Если стейт статусов пустой, то нет смысла в выводе текущего компонента */
  if (!items.length) return null

  return (
    <div className="status-bar">
      <ul className="status-bar__list">
        {items.map(({ label, expirationTimeMS }, index) => {
          return (
            <li className="status-bar__item" key={index}>
              <div
                className="status-bar__label"
                style={{
                  /**
                   * Для управления "исчезнованиеим" статуса,
                   * в CSS будем использовать переменную 'expirationTimeMS'
                   * она будет использоваться
                   * в качестве длительности анимации исчезновения
                   */
                  '--expirationTimeMS': `${expirationTimeMS}ms`,
                }}
                onAnimationEnd={onLabelAnimationEnd}
              >
                {label}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default StatusBar