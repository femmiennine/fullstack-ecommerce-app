import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../app/hook'
import { deleteProduct, fetchProducts } from '../../../features/productSlice'
import { ProductType } from '../../../types'
import { baseUrl } from '../../../utils/constants'
import toast from 'react-hot-toast'
import { BorderColor, Delete } from '@material-ui/icons'
import { getSuggestedQuery } from '@testing-library/react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const ProductList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 20px;
  width: 75vw;
`

const Input = styled.input`
  width: 100vh;
  height: 1.5rem;
`

const Image = styled.img`
  width: 20px;
`

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  margin-top: 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`

const TrashButton = styled.button`
  border: none;
  background-color: none;
  color: teal;
`

const AdminProducts = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.product.products)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleDelete = async (_id: string) => {
    try {
      dispatch(deleteProduct(_id))
      toast.success('Product deleted successfully')
      fetchProducts()
    } catch (error: any) {
      console.log(error)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setSearch(newValue)
  }

  return (
    <Container>
      <h1>Baby on Board Products</h1>
      <Link to='/create-product'>
        <Button>CREATE NEW PRODUCT</Button>
      </Link>
      <ProductList>
        <div>
          <Input value={search} onChange={handleChange} placeholder='Search products here...' />
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
          {products
            .filter((product) => product.title.toLowerCase().includes(search))
            .map((product: ProductType) => {
              return (
                <tr key={product._id}>
                  <td>
                    <Image src={`${baseUrl}${product.image}`}></Image>
                  </td>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.desc}</td>
                  <td>
                    <Link to={`/update-product/${product.productId}`}>
                      <BorderColor />
                    </Link>
                  </td>
                  <td>
                    <TrashButton
                      onClick={() => {
                        handleDelete(product._id)
                      }}
                    >
                      <Delete />
                    </TrashButton>
                  </td>
                  <td></td>
                </tr>
              )
            })}
        </table>
      </ProductList>
    </Container>
  )
}
export default AdminProducts
