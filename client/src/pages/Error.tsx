import { Link } from 'react-router-dom'
import styled from 'styled-components'
import error from '../images/error.jpg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`
const Image = styled.img`
  width: 40%;
  height: 40%;
`

const Homepage = styled.h3`
  display: flex;
  gap: 5px;
`

const Error = () => {
  return (
    <Container>
      <Image src={error} alt='404 error robot' />
      <Homepage>
        GO BACK TO
        <Link to='/'>HOMEPAGE</Link>
      </Homepage>
    </Container>
  )
}
export default Error
