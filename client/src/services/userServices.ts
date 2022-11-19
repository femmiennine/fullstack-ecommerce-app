import axios from 'axios'
import { UserRegister, VerifyUserType } from '../types/index'

const baseUrl = 'http://localhost:4000/api/v1/users/'

export const registerUser = async (user: UserRegister) => {
  const response = await axios.post(`${baseUrl}register`, user)
  return response.data
}

export const verifyUser = async (user: VerifyUserType) => {
  const response = await axios.post(`${baseUrl}verify-user/:_id`, user)
  return response.data
}
