import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'

import { InitialStateProduct } from '../types/index'
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

export const addProduct = createAsyncThunk('data/addProduct', async (formData: FormData) => {
  try {
    const response = await axios.post(`${baseUrl}api/v1/products`, formData)
    console.log(response)
    toast.success(response.data.data.message)
    return response.data.data
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
})

export const deleteProduct = createAsyncThunk('data/deleteProduct', async (_id: string) => {
  try {
    const data = await axios.delete(`${baseUrl}api/v1/products/${_id}`)
    toast.success(data.data.message)
    return data
  } catch (error: any) {
    toast.error(error.response.data.message)
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
