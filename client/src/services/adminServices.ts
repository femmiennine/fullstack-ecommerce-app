import axios from 'axios'
import { AdminLoginType } from '../types'

const baseUrl = 'http://localhost:4000/api/v1/admin/'

export const loginAdmin = async (admin: AdminLoginType) => {
  const response = await axios.post(`${baseUrl}login`, admin)
  return response.data
}
