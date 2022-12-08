import styled from 'styled-components'
import AdminProducts from './components/AdminProducts'
import Sidebar from './components/Sidebar'

const Container = styled.div`
  display: flex;
  width: 100%;
`
const AdminDashboard = () => {
  return (
    <Container>
      <Sidebar />
      <AdminProducts />
    </Container>
  )
}
export default AdminDashboard
