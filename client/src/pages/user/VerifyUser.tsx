import styled from 'styled-components'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { mobile } from '../../utils/responsive'
import verify from '../../images/verify.jpg'
import { Navbar } from '../../components'
import Footer from '../../components/Footer'
import { verifyUser } from '../../services/userServices'

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

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`

const VerifyUser = () => {
  const { token } = useParams()
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      const response = await verifyUser(token)
      toast.success(response.message)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <Navbar />
      <Container>
        <Toaster position='top-center' reverseOrder={false} />
        <Wrapper>
          <Title>Verify Your Email</Title>
          <Button type='submit' onClick={handleClick}>
            VERIFY EMAIL
          </Button>
        </Wrapper>
      </Container>
      <Footer />
    </>
  )
}

export default VerifyUser
