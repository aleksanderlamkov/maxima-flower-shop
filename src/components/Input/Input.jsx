import React from 'react'
import './Input.css'

const Input = (props) => {
  const {
    className = '',
    name,
    /**
     * Помимо атрибута 'name' элементу <input />
     * нужен атрибут 'id', по умолчанию значение которого
     * вполне разумно сделать аналогичным 'name'
     */
    id = name,
    /**
     * Валидная семантическая верстка требует,
     * чтобы у каждого поля ввода
     * был соответствующий ему элемент <label>.
     *
     * Но т. к. по нашему макету у полей фактически
     * отсутствует этот элемент
     * (вместо него используется placeholder),
     * то выведем элемент, но скроем
     * через утилитарный CSS-класс 'visually-hidden',
     * который будем добавлять только,
     * если у компонента
     * проп 'isLabelHidden' равен true (значение по умолчанию)
     */
    label,
    isLabelHidden = true,
    /**
     * Для определения типа выводимого тега компонента
     * используем проп type, значение которого может быть
     * стандартной строкой ‘text’, ‘email’, ‘password’ и т. д.,
     * а также новый собственный тип ‘textarea’.
     *
     * По умолчанию - 'text'
     */
    type = 'text',
    placeholder,
    value,
    /**
     * Для индикации ошибки используем проп 'error' в формате строки
     */
    error = '',
    onChange,
  } = props

  /**
   * Две следующие строки определяют тип выводимого элемента.
   * Переменная 'Component' названа с большой буквы,
   * т. к. так требует JSX формат, содержит она строку,
   * соответствующую названию выводимого HTML-тега.
   */
  const isTextArea = type === 'textarea'
  const Component = isTextArea ? 'textarea' : 'input'

  /**
   * Т. к. у HTML-тегов 'input' и 'textarea' разный набор пропсов,
   * разумно будет подстраховаться
   * от вывода лишних атрибутов в итоговой разметке
   */
  const onlyTextAreaProps = {}
  const onlyInputProps = { type }
  const extraProps = isTextArea ? onlyTextAreaProps : onlyInputProps

  /**
   * Для проверки наличия ошибки
   * достаточно привести строку 'error' к булевому значению
   */
  const hasError = Boolean(error)

  /**
   * Синтаксис пустых угловых скобок означает
   * буквально отсутствие общего родительского элемента
   * у дочерних элементов.
   * Без них нельзя в return вернуть на одном уровне 2 элемента.
   */
  return (
    <>
      <label
        className={`${isLabelHidden ?  'visually-hidden' : ''}`}
        htmlFor={id}
      >
        {label}
      </label>
      <Component
        className={`${className} input ${hasError ? 'is-invalid' : ''}`}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...extraProps}
      />
      {hasError && <div className="error">{error}</div>}
    </>
  )
}

export default Input