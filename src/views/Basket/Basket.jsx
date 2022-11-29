import React, { useEffect, useState } from 'react'
import { API_URL } from '../Catalog/Catalog'
import BasketCard from '../../components/BasketCard/BasketCard'
import './Basket.css'
import { useSelector } from 'react-redux'

const Basket = () => {
  const basketItems = useSelector(({ basket }) => basket.items)

  /**
   * В переменной храним уникальное количество товаров в корзине,
   * это значение понадобится нам для оптимизации
   * количества запросов к серверу,
   * т. к. нам не нужно перезапрашивать новые данные
   * (картинка, название, категория, цена за 1 шт)
   * для текущего списка товаров,
   * если изменилось лишь количество этого товара в корзине
   */
  const uniqueBasketItems = Object.keys(basketItems).length
  /**
   * Суммарное количество товаров теперь считаем немного иначе,
   * перебирая значения в объекте basketItems
   */
  const totalAmount = Object.values(basketItems).reduce((total, amount) => total += amount, 0)

  const [products, setProducts] = useState([])
  /**
   * Для подсчёта суммарной цены заводим стейт-переменную, 
   * будем обновлять её всякий раз, 
   * когда меняется стейт-переменная products
   */
  const [totalPrice, setTotalPrice] = useState(0)

  /**
   * Обновление количества товаров 
   * (в каждом элементе из массива products)
   * делаем отдельной функцией, 
   * которую будем вызывать только тогда, 
   * когда есть изменения 
   * в глобальной стейт-переменной basketItems
   */
  const updateProductsAmountValues = () => {
    const newProducts = products.map((product) => ({
      ...product,
      amount: basketItems[product.productId]
    }))

    setProducts(newProducts)
  }

  /**
   * Функцию обновления суммарной цены 
   * будем вызывать всякий раз,
   * когда меняется стейт-переменная products
   */
  const updateTotalPrice = () => {
    const newTotalPrice = products.reduce((total, { amount, price }) => total += amount * price, 0)
    const newTotalPriceFormatted = newTotalPrice.toFixed(2)

    setTotalPrice(newTotalPriceFormatted)
  }

  const fetchProducts = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((responseData) => {
        const allProducts = responseData.flowerlist
        const newProducts = []

        allProducts.forEach((product) => {
          /**
           * Чтобы не дублировать 'product.productId', 
           * заводим отдельную переменную 'id'
           */
          const id = product.productId
          /**
           * Для проверки существования элемента в корзине 
           * теперь достаточно вызвать у объекта 'basketItems'
           * метод 'hasOwnProperty', вощзвращающий true или false, 
           * в зависимости от существования в объекте элемента
           * по переданному в аргументы метода ключу
           */
          const isExistInBasket = basketItems.hasOwnProperty(id)

          if (isExistInBasket) {
            newProducts.push({
              ...product,
              amount: basketItems[id]
            })
          }
        })

        setProducts(newProducts)
      })
  }

  /**
   * Запрос к серверу совершаем лишь тогда, 
   * когда изменено количество уникальных элементов в корзине
   */
  useEffect(() => {
    fetchProducts()
  }, [uniqueBasketItems])

  /**
   * Обновление значения 'amount'
   * в объектах массива стейт-переменной 'products'
   * совершаем только в случае изменения глобального
   * стейт-объекта basketItems
   */
  useEffect(() => {
    updateProductsAmountValues()
  }, [basketItems])

  /**
   * Обновление суммарной цены
   * будем вызывать всякий раз,
   * когда меняется стейт-переменная products
   */
  useEffect(() => {
    updateTotalPrice()
  }, [products])

  return (
    <div className="basket">
      <div className="basket__body">
        <h1 className="basket__title">Your Cart</h1>
        {products.length ? (
          <ul className="basket__list">
            {products.map((product) => {
              const {
                category,
                name,
                price,
                productId,
                amount,
              } = product

              return (
                <li className="basket__item" key={productId}>
                  <BasketCard
                    title={name}
                    category={category}
                    price={price}
                    id={productId}
                    amount={amount}
                    imgSrc="https://placekitten.com/146/146"
                  />
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="basket__empty-message">
            Basket is empty
          </div>
        )}
      </div>
      <div className="basket__summary">
        <div className="basket__summary-info">
          Subtotal for {totalAmount} items: {totalPrice}$
        </div>
        <button className="basket__summary-submit-button" type="button">
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Basket