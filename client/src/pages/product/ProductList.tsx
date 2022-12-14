import styled from 'styled-components'
import { Announcement, Navbar } from '../../components/index'
import ProductCard from '../../components/ProductCard'

const Container = styled.div``

const ProductList = () => {
  return (
    <Container>
      <Announcement />
      <Navbar />
      <ProductCard />
    </Container>
  )
}

export default ProductList
