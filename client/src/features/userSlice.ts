import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  UserRegister,
  UserLogin,
  ForgetPasswordType,
  ResetPasswordType,
  InitialUserType,
} from '../types'
import { baseUrl } from '../utils/constants'

axios.defaults.withCredentials = true

const initialState: InitialUserType = {
  isLoggedIn: false,
  loading: false,
  error: '',
  users: [],
}

export const fetchUsers = createAsyncThunk('data/logoutUser', async () => {
  try {
    const response = await axios.get(`${baseUrl}api/v1/users`, { withCredentials: true })
    console.log(response)
    toast.success(response.data.message)
    return response.data.data
  } catch (error: any) {
    console.log(error)
    toast.error(error.response.data.message)
  }
})

export const registerUser = createAsyncThunk('data/registerUser', async (user: UserRegister) => {
  try {
    const response = await axios.post(`${baseUrl}api/v1/users/register`, user)
    console.log(response)
  } catch (error: any) {
    console.log(error)
  }
})

export const loginUser = createAsyncThunk('data/loginUser', async (user: UserLogin) => {
  try {
    const response = await axios.post(`${baseUrl}api/v1/users/login`, user)
    console.log(response)
  } catch (error: any) {
    console.log(error)
  }
})

export const verifyUser = createAsyncThunk('data/verifyUser', async (token: string | undefined) => {
  try {
    const response = await axios.post(`${baseUrl}api/v1/users/verify-user/${token}`, token)
    console.log(response)
  } catch (error: any) {
    console.log(error)
  }
})

export const forgetPassword = createAsyncThunk(
  'data/forgetPassword',
  async (user: ForgetPasswordType) => {
    try {
      const response = await axios.post(`${baseUrl}api/v1/users/forget-password`, user)
      console.log(response)
    } catch (error: any) {
      console.log(error)
    }
  },
)

export const resetPassword = createAsyncThunk(
  'data/resetPassword',
  async (user: ResetPasswordType) => {
    try {
      const response = await axios.post(`${baseUrl}api/v1/users/reset-password`, user)
      console.log(response)
    } catch (error: any) {
      console.log(error)
    }
  },
)

export const logoutUser = createAsyncThunk('data/logoutUser', async () => {
  try {
    const response = await axios.post(`${baseUrl}api/v1/users/logout`, { withCredentials: true })
    console.log(response)
  } catch (error: any) {
    console.log(error)
  }
})

export const userAccess = createAsyncThunk('data/logoutUser', async (_id: string) => {
  try {
    const response = await axios.post(`${baseUrl}api/v1/users/user-access/${_id}`)
    console.log(response)
  } catch (error: any) {
    console.log(error)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.isLoggedIn = false
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true
    })

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.error = ''
      state.users = action.payload
    })

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message || 'Could not fetch data'
    })
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
