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
