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
import SliderPage from './pages/SliderPage'
import GalleryPage from './pages/GalleryPage'
import SliderGalleryPage from './pages/SliderGalleryPage'
import ModalPage from './pages/ModalPage'
import PaginationPage from './pages/PaginationPage'
import CompareSliderPage from './pages/CompareSliderPage'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
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
              <Route path="/slider" element={<SliderPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/slider-gallery" element={<SliderGalleryPage />} />
              <Route path="/modal" element={<ModalPage />} />
              <Route path="/modal" element={<ModalPage />} />
              <Route path="/pagination" element={<PaginationPage />} />
              <Route path="/compare-slider" element={<CompareSliderPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App