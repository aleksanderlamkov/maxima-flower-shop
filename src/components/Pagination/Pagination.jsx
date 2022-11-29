import React from 'react'
import './Pagination.css'

const Pagination = (props) => {
  const {
    className = '',
    totalPages,
    currentPage = 1,
    setPageNumber,
  } = props

  /**
   * Если возможных страниц пагинации меньше 2-х,
   * то смысла в компоненте пагинации нет
   */
  if (totalPages < 2) return null

  const setPreviousPage = () => {
    /**
     * Если текущий номер страницы больше единицы,
     * устанавливаем предыдущий номер страницы.
     */
    if (currentPage > 1) {
      setPageNumber(currentPage - 1)
    }
  }

  const setNextPage = () => {
    /**
     * Если текущий номер страницы меньше
     * общего количества страниц,
     * устанавливаем следующий номер страницы.
     */
    if (currentPage < totalPages) {
      setPageNumber(currentPage + 1)
    }
  }

  /**
   * Исходя из числа в 'totalPages',
   * можно получить массив чисел от 1 до 'totalPages',
   * чтобы далее в JSX проитерироваться
   * циклом через метод 'map'
   * (т. к. в JSX нельзя использовать цикл for,
   * приходится писать подобные подготовительные конструкции).
   *
   * [...Array(totalPages).keys()] вернет массив чисел,
   * начиная с 0, для удобства преобразуем
   * все числа внутри на +1, чтобы счёт в массиве шел с единиц.
   */
  const items = [...Array(totalPages).keys()].map((number) => number + 1)

  return (
    <nav className={`${className} pagination`}>
      <ul className="pagination__list">
        <li className="pagination__item">
          <button
            className="pagination__button"
            type="button"
            onClick={setPreviousPage}
            disabled={currentPage === 1}
          >
            ←
          </button>
        </li>
        {items.map((number) => {
          const isActive = number === currentPage

          return (
            <li className="pagination__item" key={number.toString()}>
              <button
                className={`pagination__button ${isActive ? 'is-active' : ''}`}
                type="button"
                onClick={() => setPageNumber(number)}
              >
                {number}
              </button>
            </li>
          )
        })}
        <li className="pagination__item">
          <button
            className="pagination__button"
            type="button"
            disabled={currentPage === totalPages}
            onClick={setNextPage}
          >
            →
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination