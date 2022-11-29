import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { UserProfileType } from '../../types'
import userprofile from '../../images/userprofile.jpg'
import { mobile } from '../../utils/responsive'
import { Navbar } from '../../components'
import Footer from '../../components/Footer'

axios.defaults.withCredentials = true

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url(${userprofile}) center;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const Input = styled.input`
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
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

const Profile = () => {
  const [user, setUser] = useState<UserProfileType>()
  const sendRequest = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/users/profile', {
        withCredentials: true,
      })
      setUser(response.data.user)
      console.log(response.data.user)
      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    sendRequest()
  }, [])

  return (
    <>
      <Navbar />
      <Container>
        <Toaster position='top-center' reverseOrder={false} />
        <Wrapper>
          <Title>Welcome to Baby on Board, {user?.firstname}!</Title>
          <Form>
            <img src={user?.image} />
            <Input placeholder={user?.firstname} />
            <Input placeholder={user?.lastname} />
            <Input placeholder={user?.email} />
            <Input placeholder={user?.phone} />
            <br />
            <Button type='submit'>EDIT ACCOUNT</Button>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  )
}
export default Profile
