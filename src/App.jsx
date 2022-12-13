import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Layout from './views/Layout/Layout'
import HomePage from './pages/HomePage'
import BasketPage from './pages/BasketPage'
import FeedbackPage from './pages/FeedbackPage'
import ProductPage from './pages/ProductPage'
import SignUpPage from './pages/SignUpPage'
import store, { persistor } from './store'
import './firebase.js'
import SignInPage from './pages/SignInPage'
import { PersistGate } from 'redux-persist/integration/react'
import PrivateRoute from './PrivateRoute'
import ImageSliderPage from './pages/ImageSliderPage'

const App = () => {
  const isDevMode = process.env.NODE_ENV === 'development'
  const baseName = isDevMode ? '' : process.env.PUBLIC_URL
  console.debug('baseName:', baseName)

  return (
    <Provider store={store}>
      <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
        <BrowserRouter basename={baseName}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={(
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                )}
              />
              <Route path="/basket" element={<BasketPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/catalog/:id" element={<ProductPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/image-slider" element={<ImageSliderPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App