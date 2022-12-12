import styled from 'styled-components'
// import AdminProducts from './components/AdminProducts'
import Sidebar from './components/Sidebar'
import ProductTableList from './components/ProductTableList'

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #efefef;
`
const AdminDashboard = () => {
  return (
    <Container>
      <Sidebar />
      <ProductTableList />
    </Container>
  )
}
export default AdminDashboard
