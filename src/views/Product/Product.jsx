import React from 'react'
import Counter from '../../components/Counter/Counter'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, increaseBasketItem, decreaseBasketItem } from '../../store/basketSlice'

const Product = (props) => {
  const {
    id,
    title,
    description,
    price = 0,
    imgSrc,
    category,
  } = props

  const basketItems = useSelector(({ basket }) => basket.items)
  const dispatch = useDispatch()

  const productInBasket = basketItems[id]
  const amount = basketItems[id] ?? 0
  const isExistInBasket = amount > 0

  return (
    <div className="product">
      <img
        className="product__image"
        src={imgSrc}
        alt={title}
        width="356"
        height="326"
        loading="lazy"
      />
      <div className="product__body">
        <h1 className="product__title">{title}</h1>
        <div className="product__description">{description}</div>
        <div className="product__info">
          <div className="product__price">{price} $</div>
          {isExistInBasket && (
            <Counter
              className="product__counter"
              value={amount}
              onIncrease={() => dispatch(increaseBasketItem(id))}
              onDecrease={() => dispatch(decreaseBasketItem(id))}
            />
          )}
          <div className="product__actions">
            <button
              className="product__buy-button"
              type="button"
              onClick={() => dispatch(addToBasket(id))}
            >
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.70343 0.23877C4.1189 0.23877 4.47657 0.54044 4.55605 0.9574V0.9574C4.58696 1.21975 4.80932 1.41746 5.07348 1.41746H19.8094C20.5428 1.41746 21.1281 2.16334 20.9222 2.91512L18.9712 9.98871C18.8303 10.497 18.3751 10.8469 17.8585 10.8469H7.4679C6.91421 10.8469 6.49681 11.3501 6.59911 11.8943V11.8943C6.67767 12.3122 7.04266 12.615 7.4679 12.615H17.8657C18.3462 12.615 18.7328 13.0091 18.7328 13.499C18.7328 13.9889 18.3462 14.383 17.8657 14.383H5.98312C5.60016 14.383 5.24249 14.081 5.16301 13.6647L3.33172 3.85852C3.13125 2.78502 2.19424 2.0068 1.10219 2.0068V2.0068C0.623487 2.0068 0.235107 1.61083 0.235107 1.12278C0.235107 0.634734 0.623487 0.23877 1.10219 0.23877H3.70343ZM4.85953 17.3297C4.85953 16.3536 5.63629 15.5617 6.59369 15.5617C7.55109 15.5617 8.32785 16.3536 8.32785 17.3297C8.32785 18.3058 7.55109 19.0977 6.59369 19.0977C5.63629 19.0977 4.85953 18.3058 4.85953 17.3297ZM18.7328 17.3297C18.7328 18.3058 17.956 19.0977 16.9986 19.0977C16.0412 19.0977 15.2645 18.3058 15.2645 17.3297C15.2645 16.3536 16.0412 15.5617 16.9986 15.5617C17.956 15.5617 18.7328 16.3536 18.7328 17.3297Z" fill="#FF8F52"/>
              </svg>
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product