import { ReactNode } from 'react'

export type UserRegister = {
  firstname: string
  lastname: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export type VerifyUserType = {
  email: string
}

export type UserLogin = {
  email: string
  password: string
}

export type ForgetPasswordType = {
  email: string
}

export type ResetPasswordType = {
  password: string
  email: string
  confirmPassword: string
}

export type UserProfileType = {
  firstname: string
  lastname: string
  email: string
  phone: string
  password: string
  image: string
}

export type AdminLoginType = {
  email: string
  password: string
}

export type InitialStateProduct = {
  loading: boolean
  error: string
  products: ProductType[]
}

export type ProductType = {
  _id: string
  title: string
  desc: string
  image: string
  category: string
  price: number
  inStock: boolean
}
