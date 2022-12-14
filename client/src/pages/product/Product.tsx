import { Add, Remove } from '@material-ui/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Announcement, Navbar } from '../../components/index'
import { ProductType } from '../../types'
import { baseUrl } from '../../utils/constants'
import register from '../../images/register.jpg'
import { ArrowBackOutlined } from '@mui/icons-material'

const Container = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url(${register}) center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Card = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  gap: 50px;
  width: 60%;
  padding: 20px;
`

const ImageContainer = styled.div`
  width: 20vw;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
`

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Title = styled.h2`
  color: teal;
`

const Category = styled.p`
  font-style: italic;
  color: grey;
`

const Stock = styled.span`
  font-size: 0.8rem;
  font-style: italic;
  color: grey;
`

const Price = styled.h4`
  color: teal;
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`

const LightButton = styled.button`
  width: 40%;
  border: 1px solid teal;
  padding: 15px 20px;
  margin-top: 20px;
  background-color: white;
  color: teal;
  cursor: pointer;
`

const Product = () => {
  const params = useParams()
  const [product, setProduct] = useState<ProductType>()

  const fetchProductById = async (_id: string | undefined) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/products/${params._id}`)
      console.log(response)
      setProduct(response.data.data)
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProductById(params._id)
  }, [])

  return (
    <>
      <Navbar />
      <Announcement />
      <Container>
        <Card>
          <ImageContainer>
            <Image src={`${baseUrl}${product?.image}`} />
          </ImageContainer>
          <DetailContainer>
            <div>
              <Title>{product?.title}</Title>
              <Category>{product?.category}</Category>
            </div>
            <div>
              <p>{product?.desc}</p>
            </div>
            <div>
              {product?.inStock ? (
                <Stock>{product?.quantity} In Stock</Stock>
              ) : (
                <Stock>Out of Stock</Stock>
              )}
              <Price>{product?.price}SEK</Price>
            </div>
            <ButtonContainer>
              <Link to='/cart'>
                <Button>ADD TO CART</Button>
              </Link>
              <Link to='/productslist'>
                <LightButton>BACK TO PRODUCTS</LightButton>
              </Link>
            </ButtonContainer>
          </DetailContainer>
        </Card>
      </Container>
    </>
  )
}

export default Product
