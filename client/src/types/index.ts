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
  productId: string
  title: string
  desc: string
  image: string
  category: string
  price: string
  quantity: string
  // shipping: boolean
  // inStock: boolean
}

export type InitialUserType = {
  isLoggedIn: boolean
  loading: boolean
  error: string
  users: UserType[]
}

export type UserType = {
  _id: string
  firstname: string
  lastname: string
  email: string
  phone: string
  password: string
  image: string
  isBanned: boolean
}
