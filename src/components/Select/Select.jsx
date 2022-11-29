import React, { useState } from 'react'
import './Select.css'

const Select = (props) => {
  const {
    className = '',
    /**
     * Ситуация с label аналогична компоненту Input,
     * однако нелогично скрывать надпись у select'а,
     * поэтому оставляем дефолтное значение isLabelHidden, как false.
     */
    label,
    isLabelHidden = false,
    name,
    id = name,
    /**
     * В обычном HTML элементе <select> нет атрибута value,
     * т. к. вместо него устанавливается атрибут 'selected' у <options>.
     * В JSX же у option такой атрибут не нужен,
     * а value прописывается в сам элемент<select>
     */
    value,
    options = [],
    onChange,
  } = props

  /**
   * У компонента селекта единственное состояние:
   * раскрытый / закрытый dropdown-список опций
   */
  const [isOpen, setIsOpen] = useState(false)

  const hasOptions = options.length > 0
  /**
   * Для вывода текущего выбранного варианта
   * необходимо его найти среди списка опций
   * и получить значение ключа 'label'
   */
  const currentVariant = options.find((option) => option.value === value).label

  const onBodyClick = () => {
    setIsOpen(!isOpen)
  }

  const onDropdownButtonClick = (value) => {
    onChange(value)
    setIsOpen(false)
  }

  /**
   * Если массив опций при вызове компонента пуст,
   * то чтобы разметка не поломалась, просто возвращаем null,
   * что буквально означает отсутствие какой-либо разметки
   */
  if (!hasOptions) return null

  /**
   * В разметке компонента присутствует
   * оригинальный HTML-элемент <select>
   * Без него обойтись нельзя, но мы его
   * скрываем через visually-hidden класс
   * и рисуем кастомную разметку компонента
   */
  return (
    <div className={`${className} select`}>
      <label
        className={`select__label ${isLabelHidden ?  'visually-hidden' : ''}`}
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className="visually-hidden"
        name={name}
        onChange={onChange}
        value={value}
      >
        {options.map(({ value, label }) => (
          <option
            key={value}
            value={value}
          >
            {label}
          </option>
        ))}
      </select>
      <div className={`select__dropdown ${isOpen ? 'is-open' : ''}`}>
        <ul className="select__dropdown-list">
          {options.map(({ value: optionValue, label }) => {
            const isSelected = optionValue === value

            return (
              <li className="select__dropdown-item" key={optionValue}>
                <button
                  className={`select__dropdown-button ${isSelected ? 'is-selected' : ''}`}
                  type="button"
                  onClick={() => onDropdownButtonClick(optionValue)}
                >
                  {label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="select__body input" onClick={onBodyClick}>
        <div className="select__current-variant">{currentVariant}</div>
        <div className="select__arrow-icon">
          ↓
        </div>
      </div>
    </div>
  )
}

export default Select