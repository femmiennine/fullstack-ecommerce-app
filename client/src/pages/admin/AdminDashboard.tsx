import styled from 'styled-components'
// import AdminProducts from './components/AdminProducts'
import Sidebar from './components/Sidebar'
import ProductTableList from './components/ProductTableList'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { useEffect } from 'react'
import { fetchProducts } from '../../features/productSlice'
import { ProductType } from '../../types'

const Container = styled.div`
  display: flex;
  width: 100%;
`
const AdminDashboard = () => {
  return (
    <Container>
      <Sidebar />
      {/* <AdminProducts /> */}
      <ProductTableList />
    </Container>
  )
}
export default AdminDashboard
