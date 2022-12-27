import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard/ProductCard'
import CatalogBody from './components/CatalogBody/CatalogBody'
import CatalogFilter from './components/CatalogFilter/CatalogFilter'
import Pagination from '../../components/Pagination/Pagination'
import './Catalog.css'

export const defaultCategory = 'All'

export const API_URL = 'https://raw.githubusercontent.com/SoraMaruyama/flowerAPI/master/flowers.json'

const itemsPerPage = 8

const Catalog = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([defaultCategory])

  const [searchParams, setSearchParams] = useSearchParams()
  /**
   * Из 'searchParams' получить
   * значение get-параметра 'page'
   * можно только через метод 'get'
   *
   * Если такой параметр отсутствует,
   * то с помощью оператора ?? получим то,
   * что указано после него, то есть число 1
   *
   * Если методом get('page') мы всё же получим данные,
   * то значение будет в формате строки,
   * а для удобной работы нам нужно число,
   * поэтому оборачиваем всё выражение в 'parseInt'
   */
  const page = parseInt(searchParams.get('page') ?? 1)

  /**
   * С помощью метода 'slice' "режем"
   * отфильтрованный ранее массив товаров
   * и получаем массив только тех товаров,
   * которые должны отображаться на текущей странице.
   *
   * Аргументами метод 'splice' принимает
   * начальный индекс обрезаемого массива
   * и количество "вырезаемых" элементов.
   */
  const filteredVisibleProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  /**
   * Чтобы получить общее число возможных страниц,
   * делим длину отфильтрованного массива товаров
   * на количество отображаемых элементов на одной странице.
   *
   * Т. к. число может получиться неровным,
   * оборачиваем всё в Math.round, что округлит
   * результат в большую сторону до ближайшего целого,
   * например, с 5.5 до 6.
   */
  const totalPages = Math.round(filteredProducts.length / itemsPerPage)

  /**
   * Для установки номера страницы
   * не лишним будет создать вспомогательную функцию.
   */
  const setPageNumber = (pageNumber) => {
    /**
     * GET-параметры, передаваемые
     * в аргументы функции 'setSearchParams',
     * передаются в формате объекта
     * со значениями в виде строк
     * (а т. к. pageNumber будет числом,
     * то дополнительно приводим его к строке)
     */
    setSearchParams({ page: pageNumber.toString() })
  }

  const getCategoriesFromProducts = (products) => {
    const allCategoryNames = products.map(({ category }) => category)
    const uniqueCategoryNames = new Set(allCategoryNames)

    return Array.from(uniqueCategoryNames)
  }

  const fetchProducts = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((response) => {
        const newProducts = response.flowerlist.map((product) => ({
          ...product,
          imgSrc: 'https://placekitten.com/250/230'
        }))
        const newCategories = getCategoriesFromProducts(newProducts)

        setProducts(newProducts)
        setFilteredProducts(newProducts)
        setCategories([...categories, ...newCategories])
      })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="catalog">
      <CatalogFilter
        products={products}
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
        categories={categories}
      />
      <CatalogBody products={filteredVisibleProducts} />
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPageNumber={setPageNumber}
      />
    </div>
  )
}

export default Catalog