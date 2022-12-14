import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../app/hook'
import { deleteProduct, fetchProducts } from '../../../features/productSlice'
import { ProductType } from '../../../types'
import { baseUrl } from '../../../utils/constants'
import toast from 'react-hot-toast'
import { BorderColorOutlined, DeleteOutlined, Search } from '@material-ui/icons'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
`

const Title = styled.h1`
  margin: 20px;
`

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;
  flex-wrap: wrap;
  width: 80vw;
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

const Table = styled.table`
  width: 100%;
  padding: 30px;
  border-radius: 10px;
`

const TableHead = styled.tr`
  gap: 1rem;
  border-bottom: 1px solid grey;
  text-align: left;
`

const Image = styled.img`
  width: 50px;
`

const Button = styled.button`
  width: 20%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-left: 25px;
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
      <Title>Baby on Board Product List</Title>
      <ProductList>
        <div>
          <Link to='/create-product'>
            <Button>CREATE NEW PRODUCT</Button>
          </Link>
        </div>
        <SearchContainer>
          <Input value={search} onChange={handleChange} placeholder='Search' />
          <Search style={{ color: 'gray', fontSize: 16 }} />
        </SearchContainer>
        <Table>
          <TableHead>
            <th>Product</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Edit</th>
            <th>Delete</th>
          </TableHead>
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
                  <td>{product.quantity}</td>
                  <td>
                    <Link to={`/update-product/${product.productId}`}>
                      <BorderColorOutlined style={{ color: 'teal' }} />
                    </Link>
                  </td>
                  <td>
                    <TrashButton
                      onClick={() => {
                        handleDelete(product._id)
                      }}
                    >
                      <DeleteOutlined style={{ color: 'teal' }} />
                    </TrashButton>
                  </td>
                </tr>
              )
            })}
        </Table>
      </ProductList>
    </Container>
  )
}
export default AdminProducts
