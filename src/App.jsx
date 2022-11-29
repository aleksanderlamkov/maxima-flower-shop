import React  from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Layout from './views/Layout/Layout'
import HomePage from './pages/HomePage'
import BasketPage from './pages/BasketPage'
import FeedbackPage from './pages/FeedbackPage'
import ProductPage from './pages/ProductPage'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/catalog/:id" element={<ProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App