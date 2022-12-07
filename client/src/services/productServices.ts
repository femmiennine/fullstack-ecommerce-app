import axios from 'axios'

const baseUrl = 'http://localhost:4000/api/v1/products/'

export const createProduct = async (formData: FormData) => {
  const response = await axios.post(`${baseUrl}`, formData)
  return response.data
}
