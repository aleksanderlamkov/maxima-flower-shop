import React, { useEffect, useState } from 'react'
import Input from '../../../../components/Input/Input'
import { defaultCategory } from '../../Catalog'
import './CatalogFilter.css'

const CatalogFilter = (props) => {
  const {
    products,
    setFilteredProducts,
    categories,
  } = props

  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(defaultCategory)

  const filter = () => {
    const newFilteredProducts = products.filter(({ name, category }) => {
      const isCategoryTheSame = category === activeCategory
      const isActiveCategoryDefault = activeCategory === defaultCategory
      const nameFormatted = name.toLowerCase()
      const searchQueryFormatted = searchQuery.toLowerCase()
      const isNameIncludesSearchQuery = nameFormatted.includes(searchQueryFormatted)

      return (isCategoryTheSame || isActiveCategoryDefault) && isNameIncludesSearchQuery
    })

    setFilteredProducts(newFilteredProducts)
  }

  const onInputChange = ({ target }) => {
    setSearchQuery(target.value)
  }

  const onCategoryButtonClick = (categoryName) => {
    setActiveCategory(categoryName)
  }

  useEffect(() => {
    filter()
  }, [searchQuery, activeCategory])

  return (
    <div className="catalog-filter">
      <div className="catalog-filter__title">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.165558 2.3577C0.449883 1.75742 1.05445 1.375 1.71875 1.375H20.2812C20.9473 1.375 21.5488 1.75742 21.8324 2.3577C22.1203 2.95797 22.0301 3.66824 21.5746 4.18215L13.75 13.7887V19.25C13.75 19.7699 13.4578 20.2469 12.9895 20.4789C12.5254 20.7109 11.9668 20.6637 11.55 20.35L8.8 18.2875C8.45195 18.0297 8.25 17.6215 8.25 17.1875V13.7887L0.388523 4.18215C-0.0320119 3.66824 -0.118809 2.95797 0.165601 2.3577H0.165558Z" fill="#FF8F52"/>
        </svg>
        <span>Filtering</span>
      </div>
      <Input
        className="catalog-filter__input"
        placeholder="Search...."
        value={searchQuery}
        onChange={onInputChange}
      />
      <div className="catalog-filter__categories">
        {categories.map((categoryName) => {
          const isActive = categoryName === activeCategory
          let classNameFormatted = 'catalog-filter__category-button'
          if (isActive) {
            classNameFormatted += ' is-active'
          }

          return (
            <button
              key={categoryName}
              className={classNameFormatted}
              type="button"
              onClick={() => onCategoryButtonClick(categoryName)}
            >
              {categoryName}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CatalogFilter