import axios from 'axios'
import { UserRegister } from '../types/index'

const baseUrl = 'http://localhost:4000/api/v1/users/'

export const registerUser = async (user: UserRegister) => {
  const response = await axios.post(`${baseUrl}register`, user)
  return response.data
}
