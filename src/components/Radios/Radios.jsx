import React from 'react'

const Radios = (props) => {
  const {
    className = '',
    name,
    /**
     * В качестве элементов компонента используется массив объектов
     * с ключами value, label, isChecked
     */
    items = [],
    /**
     * Корневой проп label не стоит путать
     * с ключом label в объектах массива пропа items,
     * т. к. корневой label отвечает за общую
     * заглавную надпись компонента
     */
    label,
  } = props

  return (
    <div className="radios">
      <div className="radios__label">{label}</div>
      <ul className="radios__list">
        {items.map(({ value, label, isChecked }) => (
          <li className="radios__item" key={value}>
            <label className="radios__radio">
              <input
                className="radios__control"
                id={value}
                name={name}
                value={value}
                defaultChecked={isChecked}
                type="radio"
              />
              <span className="radios__radio-label">{label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Radios