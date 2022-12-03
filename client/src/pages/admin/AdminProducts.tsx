import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { fetchProducts } from '../../features/productSlice'
import { ProductType } from '../../types'
import Sidebar from './components/Sidebar'
import register from '../../images/register.jpg'
import { baseUrl } from '../../utils/constants'

const Container = styled.div`
  display: flex;
  gap: 20px;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url(${register}) center;
  background-size: cover;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ProductList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  width: 75vw;
`

const Card = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 20vw;
  height: 40vh;
  gap: 1-px;
  border: 2px solid black;
`
const Button = styled.button`
  width: 55%;
  border: none;
  padding: 15px 20px;
  margin-top: 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`

const AdminProducts = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.product.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <h1>Baby on Board Products</h1>
        <Link to='/create-product'>
          <Button>CREATE PRODUCT</Button>
        </Link>
        <ProductList>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
          </table>
          {products.map((product: ProductType) => {
            return (
              <Card key={product._id}>
                <table>
                  <thead></thead>
                </table>
                <img src={`${baseUrl}${product.image}`} alt={product.title} />
                <p>Title: {product.title}</p>
                <p>Category: {product.category}</p>
                <p>Price: {product.price}</p>
                <Button>EDIT</Button>
                <Button>DELETE</Button>
              </Card>
            )
          })}
        </ProductList>
      </Wrapper>
    </Container>
  )
}
export default AdminProducts
