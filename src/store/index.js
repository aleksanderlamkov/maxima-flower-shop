import { configureStore, combineReducers } from '@reduxjs/toolkit'
import basketReducer from './slices/basketSlice'
import userReducer from './slices/userSlice'
import statusesReducer from './slices/statusesSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['statuses']
}

const rootReducer = combineReducers({
  basket: basketReducer,
  user: userReducer,
  statuses: statusesReducer,
})

const persistedRootReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedRootReducer,
  middleware: [thunk],
})

export default store
export const persistor = persistStore(store)