import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import { mobile } from '../utils/responsive'
import { useAppDispatch, useAppSelector } from '../app/hook'
import axios from 'axios'
import { logout } from '../features/userSlice'

const Container = styled.div`
  height: 60px;
  ${mobile({ height: '50px' })}
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })}
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`

const Input = styled.input`
  border: none;
  ${mobile({ width: '50px' })}
`

const Center = styled.div`
  flex: 1;
  text-align: center;
`

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
`
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`

const MenuItem = styled.div`
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`

const Navbar = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/users/logout', {
        withCredentials: true,
      })
      if (response.status === 200) {
        dispatch(logout())
        navigate('/login')
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search' />
            <Search style={{ color: 'gray', fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>BABY ON BOARD.</Logo>
        </Center>
        <Right>
          <Link style={{ textDecoration: 'none', color: 'teal' }} to='/'>
            <MenuItem>HOME</MenuItem>
          </Link>
          <Link style={{ textDecoration: 'none', color: 'teal' }} to='/products'>
            <MenuItem>PRODUCTS</MenuItem>
          </Link>

          {!isLoggedIn && (
            <>
              <Link style={{ textDecoration: 'none', color: 'teal' }} to='/register'>
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link style={{ textDecoration: 'none', color: 'teal' }} to='/login'>
                <MenuItem>LOGIN</MenuItem>
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link style={{ textDecoration: 'none', color: 'teal' }} to='/profile'>
                <MenuItem>PROFILE</MenuItem>
              </Link>
              <Link style={{ textDecoration: 'none', color: 'teal' }} to='/' onClick={handleLogout}>
                <MenuItem>LOGOUT</MenuItem>
              </Link>
            </>
          )}

          <Link style={{ textDecoration: 'none', color: 'teal' }} to='/cart'>
            <MenuItem>
              <Badge badgeContent={4} color='primary'>
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
