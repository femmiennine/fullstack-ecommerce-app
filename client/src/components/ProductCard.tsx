import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { fetchProducts } from '../features/productSlice'
import { ProductType } from '../types'
import { baseUrl } from '../utils/constants'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Search } from '@material-ui/icons'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-top: 20px;
  background-color: #efefef;
`

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  width: 50%;
  background-color: white;
`

const Input = styled.input`
  border: none;
  width: 100%;
  padding: 5px; ;
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 20px;
  width: 15vw;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`

const Title = styled.h4`
  color: #3a3b3c;
  font-weight: bold;
`

const Price = styled.p`
  color: teal;
  padding: 1px;
  font-weight: 500;
`

const ProductCard = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.product.products)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    products.filter((product) => product.title.toLowerCase().includes(search))
    setSearch(newValue)
  }

  const handleFilter = (productCategory: string) => {
    const product = products.filter((product) => product.category === productCategory)
    console.log(product)
    return product
  }

  return (
    <Container>
      <SearchContainer>
        <Input value={search} onChange={handleSearch} placeholder='Search' />
        <Search style={{ color: 'gray', fontSize: 16 }} />
      </SearchContainer>
      <div>
        <button
          onClick={() => {
            handleFilter('Baby Toys')
          }}
        >
          Baby Toys
        </button>
        <button
          onClick={() => {
            handleFilter('Baby Furniture')
          }}
        >
          Baby Furniture
        </button>
      </div>
      <Wrapper>
        {products
          .filter((product) => product.title.toLowerCase().includes(search))
          .map((product: ProductType) => (
            <Card key={product._id}>
              <Image src={`${baseUrl}${product.image}`} alt={product.title} loading='lazy' />
              <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                <Title>{product.title}</Title>
                <Price>{product.price}SEK</Price>
              </Link>
            </Card>
          ))}
      </Wrapper>
    </Container>
  )
}

export default ProductCard
