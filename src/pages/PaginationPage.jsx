import { useEffect, useState } from 'react'

const API_URL = 'https://jsonplaceholder.typicode.com/users/1/todos'

const itemsPerPage = 5

const Pagination = (props) => {
  const {
    currentPageNumber,
    totalPages,
    setNextPage,
    setPreviousPage,
    setPage,
  } = props

  const pageNumbers = [...Array(totalPages).keys()].map((number) => number + 1)

  return (
    <nav>
      <button onClick={() => setPreviousPage()}>←</button>
      {pageNumbers.map((number) => (
        <button
          style={{
            backgroundColor: number === currentPageNumber ? 'red' : null
          }}
          onClick={() => setPage(number)}
        >
          {number}
        </button>
      ))}
      <button onClick={() => setNextPage()}>→</button>
    </nav>
  )
}

const PaginationPage = () => {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(null)

  const hasItems = items.length > 0
  const totalPages = Math.round(totalItems / itemsPerPage)

  const setNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const setPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const fetchItems = () => {
    const urlFormatted = `${API_URL}?_start=${page - 1}&_limit=${itemsPerPage}`

    fetch(urlFormatted)
      .then((response) => response.json())
      .then((response) => {
        setItems(response)
      })
  }

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((response) => setTotalItems(response.length))

    fetchItems()
  }, [])

  useEffect(() => {
    fetchItems()
  }, [page])

  return (
    <div>
      <h1>PaginationPage</h1>
      {hasItems && (
        <ul>
          {items.map(({ id, title }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
      )}
      <Pagination
        currentPageNumber={page}
        totalPages={totalPages}
        setNextPage={setNextPage}
        setPreviousPage={setPreviousPage}
        setPage={setPage}
      />
    </div>
  )
}

export default PaginationPage