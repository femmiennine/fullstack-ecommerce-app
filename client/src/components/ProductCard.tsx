import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { fetchProducts } from '../features/productSlice'
import { ProductType } from '../types'
import { baseUrl } from '../utils/constants'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Search } from '@material-ui/icons'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
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

const ProductCard = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.product.products)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setSearch(newValue)
  }

  return (
    <Container>
      <SearchContainer>
        <Input value={search} onChange={handleChange} placeholder='Search' />
        <Search style={{ color: 'gray', fontSize: 16 }} />
      </SearchContainer>
      <ImageList sx={{ width: 1700, height: 800 }} cols={6} gap={20}>
        {products
          .filter((product) => product.title.toLowerCase().includes(search))
          .map((product: ProductType) => (
            <ImageListItem key={product._id}>
              <img src={`${baseUrl}${product.image}`} alt={product.title} loading='lazy' />
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: 'none', color: 'teal' }}
              >
                <ImageListItemBar
                  title={product.title}
                  subtitle={<span>{product.price}SEK</span>}
                  position='below'
                />
              </Link>
            </ImageListItem>
          ))}
      </ImageList>
    </Container>
  )
}

export default ProductCard
