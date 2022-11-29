import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  HomeOutlined,
  ChildFriendlyOutlined,
  PersonOutlineOutlined,
  LocalMallOutlined,
  SettingsOutlined,
  ExitToAppOutlined,
  WidgetsTwoTone,
} from '@material-ui/icons'
import avatar from '../../../images/blank-profile.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { UserProfileType } from '../../../types/index'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: teal;
  color: white;
  width: 15vw;
  height: 100vh;
  padding: 20px 0;
  gap: 50px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 30px;
`

const Title = styled.h2`
  color: white;
`

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
`

const Image = styled.img`
  width: 60px;
  height: 60px;
  border: 1px solid grey;
  border-radius: 50%;
`

const Navbar = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
  gap: 50px;
`

const List = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
`

const Sidebar = () => {
  const [user, setUser] = useState<UserProfileType>()
  const sendRequest = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/admin/admin-dashboard', {
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
    <Container>
      <Header>
        <Title>Baby on Board.</Title>
        <WidgetsTwoTone style={{ fontSize: '1.5rem', fontWeight: 'bolder' }} />
      </Header>

      <Profile>
        <Image src={avatar} alt='empty avatar' />
        <h4>Welcome back, {user?.firstname}!</h4>
      </Profile>

      <Navbar>
        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
          <List>
            <HomeOutlined />
            <p>Home</p>
          </List>
        </Link>

        <Link to='/admin-products' style={{ textDecoration: 'none', color: 'white' }}>
          <List>
            <ChildFriendlyOutlined />
            <p>Products</p>
          </List>
        </Link>

        <Link to='/users' style={{ textDecoration: 'none', color: 'white' }}>
          <List>
            <PersonOutlineOutlined />
            <p>Users</p>
          </List>
        </Link>

        <Link to='/order' style={{ textDecoration: 'none', color: 'white' }}>
          <List>
            <LocalMallOutlined />
            <p>Orders</p>
          </List>
        </Link>

        <Link to='/account' style={{ textDecoration: 'none', color: 'white' }}>
          <List>
            <SettingsOutlined />
            <p>Account</p>
          </List>
        </Link>

        <Link to='/admin-login' style={{ textDecoration: 'none', color: 'white' }}>
          <List>
            <ExitToAppOutlined />
            <p>Logout</p>
          </List>
        </Link>
      </Navbar>
    </Container>
  )
}
export default Sidebar
