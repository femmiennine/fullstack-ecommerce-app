import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast'
import { useAppDispatch } from '../../app/hook'
import { login } from '../../features/userSlice'
import { validationSchema } from '../../validator/login.schema'
import { AdminLoginType } from '../../types/index'
import { loginAdmin } from '../../services/adminServices'
import { mobile } from '../../utils/responsive'
import admin from '../../images/admin.jpg'
import Footer from '../../components/Footer'
import { Navbar } from '../../components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url(${admin}) center;
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

const AdminLogin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (admin: AdminLoginType, { resetForm }) => {
      try {
        const response = await loginAdmin(admin)
        toast.success(response.message)
        dispatch(login())
        navigate('/admin-dashboard')
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
          <Title>ADMIN LOGIN</Title>
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
            <Link to='/login' style={{ textDecoration: 'none', color: 'teal' }}>
              <Line>USER LOGIN</Line>
            </Link>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  )
}

export default AdminLogin
