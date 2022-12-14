import styled from 'styled-components'
import Sidebar from './components/Sidebar'
import UserTableList from './components/UserTableList'

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #efefef;
`
const UsersList = () => {
  return (
    <Container>
      <Sidebar />
      <UserTableList />
    </Container>
  )
}
export default UsersList
