import styled from 'styled-components'
import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { verifyUser } from '../../services/userServices'
import { VerifyUserType } from '../../types/index'
import { validationSchema } from '../../validator/verifyUser.schema'
import { mobile } from '../../utils/responsive'
import verify from '../../images/verify.jpg'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url(${verify}) center;
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
`

const VerifyUser = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (user: VerifyUserType, { resetForm }) => {
      try {
        const response = await verifyUser(user)
        toast.success(response.message)
        navigate('/login')
      } catch (error: any) {
        toast.error(error.response.data.message)
        resetForm({})
      }
    },
  })

  return (
    <Container>
      <Toaster position='top-center' reverseOrder={false} />
      <Wrapper>
        <Title>VERIFY YOUR EMAIL ADDRESS</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            type='email'
            name='email'
            id='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder='Email'
          />
          {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
          <Button type='submit'>VERIFY</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default VerifyUser
