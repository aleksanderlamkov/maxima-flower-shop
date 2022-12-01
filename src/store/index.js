import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './slices/basketSlice'
import userReducer from './slices/userSlice'
import statusesReducer from './slices/statusesSlice'

export default configureStore({
  reducer: {
    basket: basketReducer,
    user: userReducer,
    statuses: statusesReducer,
  },
})