import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './CatalogBody.css'
import { Link } from 'react-router-dom'

const CatalogBody = (props) => {
  const {
    products = [],
  } = props

  const hasProducts = products.length > 0

  return (
    <div className="catalog-body">
      {hasProducts ? (
        <ul className="catalog-body__list">
          {products.map((product) => {
            const {
              productId,
              name,
              instructions,
              price,
              imgSrc,
              category,
            } = product

            return (
              <li className="catalog-body__item" key={productId}>
                <ProductCard
                  id={productId}
                  title={name}
                  description={instructions}
                  price={price}
                  imgSrc={imgSrc}
                  category={category}
                />
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="catalog-body__empty-message">
          Goods are not found :(
        </div>
      )}
    </div>
  )
}

export default CatalogBody