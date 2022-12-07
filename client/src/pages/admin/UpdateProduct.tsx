import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../../utils/responsive'
import register from '../../images/register.jpg'
import { useAppSelector } from '../../app/hook'
import axios from 'axios'
import { baseUrl } from '../../utils/constants'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url(${register}) center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: '75%' })}
`

const Title = styled.h1`
  align-items: center;
  font-size: 24px;
  font-weight: 300;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: auto;
`

const Input = styled.input`
  min-width: 50%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`

const FileInput = styled.input`
  border: 1px solid black;
  min-width: 50%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`

const DarkButton = styled.button`
  width: 55%;
  border: none;
  padding: 15px 20px;
  margin-top: 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`

const LightButton = styled.button`
  width: 55%;
  border: 1px solid teal;
  padding: 15px 20px;
  margin-top: 20px;
  background-color: white;
  color: teal;
  cursor: pointer;
`

const UpdateProduct = () => {
  const params = useParams()
  const products = useAppSelector((state) => state.product.products)
  const existingProduct = products.filter((product) => product.productId === params.productId)
  const { title, desc, category, price, image } = existingProduct[0]
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      title: title,
      desc: desc,
      category: category,
      price: price,
      image: image,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('desc', values.desc)
        formData.append('category', values.category)
        formData.append('price', values.price)
        formData.append('image', values.image)
        const response = await axios.put(`${baseUrl}api/v1/products/${params.productId}`, formData)
        return response.data.data
        navigate('/admin-dashboard')
      } catch (error: any) {
        toast.error(error.response.data.message)
        resetForm({})
      }
    },
  })

  return (
    <Container>
      <Toaster position='top-center' reverseOrder={false} />
      <Wrapper>
        <Form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          <Title>UPDATE A PRODUCT</Title>
          <Input
            type='title'
            name='title'
            id='title'
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder='Title of Product'
          />
          <Input
            type='desc'
            name='desc'
            id='desc'
            value={formik.values.desc}
            onChange={formik.handleChange}
            placeholder='Product Description'
          />
          <Input
            type='category'
            name='category'
            id='category'
            value={formik.values.category}
            onChange={formik.handleChange}
            placeholder='Category of Product'
          />
          <Input
            type='price'
            name='price'
            id='price'
            value={formik.values.price}
            onChange={formik.handleChange}
            placeholder='Price of Product'
          />
          <FileInput
            type='file'
            name='image'
            id='image'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (!event.currentTarget.files) return
              formik.setFieldValue('image', event.currentTarget.files[0])
            }}
            placeholder='Confirm Password'
            accept='image/*'
          />
          <DarkButton type='submit'>UPDATE</DarkButton>
          <LightButton>
            <Link to='/admin-dashboard' style={{ textDecoration: 'none', color: 'teal' }}>
              BACK TO DASHBOARD
            </Link>
          </LightButton>
        </Form>
      </Wrapper>
    </Container>
  )
}
export default UpdateProduct
