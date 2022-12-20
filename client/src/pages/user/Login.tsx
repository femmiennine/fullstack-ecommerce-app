import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast'
import { useAppDispatch } from '../../app/hook'
import { login } from '../../features/userSlice'
import { validationSchema } from '../../validator/login.schema'
import { UserLogin } from '../../types/index'
import { mobile } from '../../utils/responsive'
import signin from '../../images/signin.jpg'
import Footer from '../../components/Footer'
import { Navbar } from '../../components'
import { loginUser } from '../../services/userServices'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url(${signin}) center;
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
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`

const Line = styled.p`
  font-size: 0.8rem;
  padding-bottom: 0.5rem;
`

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (user: UserLogin, { resetForm }) => {
      try {
        const response = await loginUser(user)
        toast.success(response.message)
        dispatch(login())
        navigate('/profile')
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
          <Title>USER LOGIN</Title>
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
              placeholder='Password'
            />
            <Button type='submit'>LOGIN</Button>
            <Link to='/forget-password' style={{ textDecoration: 'none', color: 'teal' }}>
              <Line>FORGET PASSWORD?</Line>
            </Link>
            <Link to='/admin-login' style={{ textDecoration: 'none', color: 'teal' }}>
              <Line>ADMIN LOGIN</Line>
            </Link>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  )
}

export default Login
