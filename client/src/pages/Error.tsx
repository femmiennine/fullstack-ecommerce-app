import styled from 'styled-components'
import error from '../images/error.jpg'
const Error = () => {
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `
  const Image = styled.img`
    width: 45%;
    height: 45%;
  `

  return (
    <Container>
      <Image src={error} alt='404 error robot' />
    </Container>
  )
}
export default Error
