import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    items: {},
  },
  reducers: {
    addToBasket: (state, action) => {
      const id = action.payload
      const newBasketItems = { ...state.items }
      /**
       * Проверяем наличие в объекте 'basketItems'
       * элемента с ключом 'id' через метод объекта 'hasOwnProperty',
       * возвращающий true, если элемент в объекте по переданному ключу существует
       */
      const isAlreadyExistInBasket = newBasketItems.hasOwnProperty(id)

      /**
       * В зависимости от существования товара в корзине,
       * либо увеличиваем значение на +1,
       * либо устанавливаем новое со значением 1
       */
      isAlreadyExistInBasket
        ? newBasketItems[id] += 1
        : newBasketItems[id] = 1

      state.items = newBasketItems
    },
    removeFromBasket: (state, action) => {
      const id = action.payload
      const newBasketItems = { ...state.items }

      /**
       * Удаляем из копии объекта basketItems элемент по ключу 'id'
       */
      delete newBasketItems[id]

      state.items = newBasketItems
    },
    increaseBasketItem: (state, action) => {
      const id = action.payload
      const newBasketItems = { ...state.items }

      newBasketItems[id]++

      state.items = newBasketItems
    },
    decreaseBasketItem: (state, action) => {
      const id = action.payload
      const newBasketItems = { ...state.items }

      const currentAmount = newBasketItems[id]
      if (currentAmount > 1) {
        newBasketItems[id]--
      } else {
        delete newBasketItems[id]
      }

      state.items = newBasketItems
    },
  },
})

// Экспортируем три экшна (из образовавшегося объекта basketSlice).
// Экшны имеют такое же название, как и редьюсеры, что немного путает, 
// однако нам нужно будет использовать именно их для изменения состояния 
export const {
  addToBasket,
  removeFromBasket,
  increaseBasketItem,
  decreaseBasketItem,
} = basketSlice.actions

// Экспортируем главный редьюсер модуля
export default basketSlice.reducer