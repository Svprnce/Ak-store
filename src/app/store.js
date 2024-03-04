import {configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/productSlice'
import userSlice from './slices/userSlice'
import orderSlice from './slices/orderSlice'

const store = configureStore({
    reducer: {
        product : productSlice,
        user : userSlice,
        orderstate : orderSlice

    },
  })


export default store