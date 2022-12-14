import axios from 'axios'
import {
  UserRegister,
  VerifyUserType,
  UserLogin,
  ForgetPasswordType,
  ResetPasswordType,
} from '../types/index'

const baseUrl = 'http://localhost:4000/api/v1/users/'

export const registerUser = async (user: UserRegister) => {
  const response = await axios.post(`${baseUrl}register`, user)
  return response.data
}

export const verifyUser = async (token: string | undefined) => {
  const response = await axios.post(`${baseUrl}verify-user/${token}`)
  return response.data
}

export const loginUser = async (user: UserLogin) => {
  const response = await axios.post(`${baseUrl}login`, user)
  return response.data
}

export const forgetPassword = async (user: ForgetPasswordType) => {
  const response = await axios.post(`${baseUrl}forget-password`, user)
  return response.data
}

export const resetPassword = async (user: ResetPasswordType) => {
  const response = await axios.post(`${baseUrl}reset-password`, user)
  return response.data
}
