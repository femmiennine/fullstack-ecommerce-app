import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { InitialStateProduct, ProductType } from '../types/index'

axios.defaults.withCredentials = true

const baseUrl = 'http://localhost:4000/api/v1/products'

export const fetchProducts = createAsyncThunk('data/fetchData', async () => {
  try {
    const response = await axios.get(`${baseUrl}`, {
      withCredentials: true,
    })
    return response.data.data
  } catch (error: any) {
    console.log(error.response.data.message)
  }
})

const initialState: InitialStateProduct = {
  loading: false,
  error: '',
  products: [],
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addNewProduct: (state, action: PayloadAction<ProductType>) => {
      state.products.push(action.payload)
    },

    updateProduct: (state, action: PayloadAction<ProductType>) => {
      const {
        payload: { _id, title, desc, image, category, price, inStock },
      } = action

      state.products = state.products.map((product) =>
        product._id === _id
          ? { ...product, title, desc, image, category, price, inStock }
          : product,
      )
    },

    deleteBook: (state, action: PayloadAction<{ _id: string }>) => {
      state.products = state.products.filter((product) => product._id !== action.payload._id)
    },
  },

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

export const { addNewProduct, updateProduct, deleteBook } = productSlice.actions
export default productSlice.reducer
