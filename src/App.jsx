import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Layout from './views/Layout/Layout'
import HomePage from './pages/HomePage'
import BasketPage from './pages/BasketPage'
import FeedbackPage from './pages/FeedbackPage'
import ProductPage from './pages/ProductPage'
import SignUpPage from './pages/SignUpPage'
import store from './store'
import './firebase.js'
import SignInPage from './pages/SignInPage'

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
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App