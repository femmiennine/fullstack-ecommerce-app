import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast'
import { validationSchema } from '../../validator/resetPassword.schema'
import { ResetPasswordType } from '../../types/index'
import { mobile } from '../../utils/responsive'
import reset from '../../images/reset.jpg'
import Footer from '../../components/Footer'
import { Navbar } from '../../components'
import { useAppDispatch } from '../../app/hook'
import { resetPassword } from '../../services/userServices'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url(${reset}) center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: '75%' })}
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`

const Button = styled.button`
  width: 60%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`

const ResetPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (user: ResetPasswordType, { resetForm }) => {
      try {
        const response = await resetPassword(user)
        toast.success(response.message)
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } catch (error: any) {
        toast.error(error.response.data.message)
        resetForm({})
      }
    },
  })
  return (
    <>
      <Navbar />
      <Container>
        <Toaster position='top-center' reverseOrder={false} />
        <Wrapper>
          <Title>RESET PASSWORD</Title>
          <Form onSubmit={formik.handleSubmit}>
            <Input
              type='email'
              name='email'
              id='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder='Email'
            />
            <Input
              type='password'
              name='password'
              id='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder='New Password'
            />
            <Input
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              placeholder='Confirm New Password'
            />
            <Button type='submit'>RESET MY PASSWORD</Button>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  )
}

export default ResetPassword
