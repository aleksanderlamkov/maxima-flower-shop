import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { API_URL } from '../views/Catalog/Catalog'
import Product from '../views/Product/Product'

const ProductPage = () => {
  const { id } = useParams()

  const [productInfo, setProductInfo] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const {
    category,
    price,
    name,
    instructions,
    productId,
  } = productInfo

  const fetchProductInfo = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((responseData) => {
        const product = responseData.flowerlist.find(({ productId }) => String(productId) === id)

        setProductInfo(product)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchProductInfo()
  }, [])

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <Product
      id={productId}
      title={name}
      description={instructions}
      price={price}
      category={category}
      imgSrc="https://placekitten.com/356/326"
    />
  )
}

export default ProductPage