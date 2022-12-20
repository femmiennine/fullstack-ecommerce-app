import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('Firstname is required'),
  lastname: Yup.string().required('Lastname is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  phone: Yup.string().required('Phone number is required'),
})
