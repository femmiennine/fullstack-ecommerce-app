import styled from 'styled-components'
import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/userServices'
import { UserRegister } from '../../types'
import { mobile } from '../../utils/responsive'
import { validationSchema } from '../../validator/registration.schema'
import register from '../../images/register.jpg'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url(${register}) center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`

const Input = styled.input`
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`

const Span = styled.span`
  color: red;
  font-size: 0.7rem;
  padding: 5px;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  flex: 1;
`

const Register = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (user: UserRegister, { resetForm }) => {
      try {
        const response = await registerUser(user)
        console.log(response)
        toast.success(response.message)
        resetForm({})
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
  })
  return (
    <Container>
      <Toaster position='top-center' reverseOrder={false} />
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            type='firstname'
            name='firstname'
            id='firstname'
            value={formik.values.firstname}
            onChange={formik.handleChange}
            placeholder='First Name'
          />
          {/* <br />
            {formik.touched.firstname && formik.errors.firstname ? (
              <Span>{formik.errors.firstname}</Span>
            ) : null} */}

          <Input
            type='lastname'
            name='lastname'
            id='lastname'
            value={formik.values.lastname}
            onChange={formik.handleChange}
            placeholder='Last Name'
          />
          {/* <br />
            {formik.touched.lastname && formik.errors.lastname ? (
              <Span>{formik.errors.lastname}</Span>
            ) : null} */}

          <Input
            type='email'
            name='email'
            id='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder='Email'
          />
          {/* <br />
            {formik.touched.email && formik.errors.email ? (
              <Span>{formik.errors.email}</Span>
            ) : null} */}

          <Input
            type='tel'
            name='phone'
            id='phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder='Phone'
          />
          {/* <br />
            {formik.touched.phone && formik.errors.phone ? (
              <Span>{formik.errors.phone}</Span>
            ) : null} */}

          <Input
            type='password'
            name='password'
            id='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder='Password'
          />
          {/* <br />
            {formik.touched.password && formik.errors.password ? (
              <Span>{formik.errors.password}</Span>
            ) : null} */}

          <Input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            placeholder='Confirm Password'
          />
          {/* <br />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <Span>{formik.errors.confirmPassword}</Span>
            ) : null} */}

          <Agreement>
            By creating an account, I consent to the processing of my personal data in accordance
            with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type='submit'>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register
