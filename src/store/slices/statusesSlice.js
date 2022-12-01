import { createSlice } from '@reduxjs/toolkit'

/**
 * Формат хранения статусов - массив объектов с ключами:
 * 'label' (строка) - текст сообщения
 * 'expirationTimeMS' (число) - время исчезновения сообщения в миллисекундах
 */

export const statusesSlice = createSlice({
  name: 'statuses',
  initialState: {
    items: [],
  },
  reducers: {
    addStatus(state, action) {
      const {
        label,
        /** По умолчанию "время жизни" каждого сообщения - 5 секунд (5000 мс) */
        expirationTimeMS = 5000,
      } = action.payload

      /**
       * Т. к. статусов может быть много в рамках сессии,
       * нужно хранить их последовательно, поэтому в качестве
       * нового состояния возвращаем объект с ключом items,
       * содержащим все имеющиеся элементы, плюс объект с новым сообщением
       */
      return {
        items: [ ...state.items, { label, expirationTimeMS } ],
      }
    },
  },
})

export const { addStatus } = statusesSlice.actions

export default statusesSlice.reducer