import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { InitialStateProduct, ProductType } from '../types/index'
import { baseUrl } from '../utils/constants'

axios.defaults.withCredentials = true

const initialState: InitialStateProduct = {
  loading: false,
  error: '',
  products: [],
}

export const fetchProducts = createAsyncThunk('data/fetchData', async () => {
  try {
    const response = await axios.get(`${baseUrl}api/v1/products`, {
      withCredentials: true,
    })
    return response.data.data
  } catch (error: any) {
    console.log(error.response.data.message)
  }
})

export const deleteProduct = createAsyncThunk('data/deleteProduct', async (_id: string) => {
  try {
    const data = await axios.delete(`${baseUrl}api/v1/products/${_id}`)
    return data
  } catch (error: any) {
    console.log(error.response.data.message)
  }
})

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true
    })

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false
      state.error = ''
      state.products = action.payload
    })

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false
      state.products = []
      state.error = action.error.message || 'Could not fetch data'
    })
  },
})

export default productSlice.reducer
