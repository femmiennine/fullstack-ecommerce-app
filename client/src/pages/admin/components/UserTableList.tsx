import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hook'
import { baseUrl } from '../../../utils/constants'
import { BlockOutlined } from '@mui/icons-material'
import { fetchUsers } from '../../../features/userSlice'
import { UserType } from '../../../types'
import axios from 'axios'

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

const Input = styled.input`
  width: 50%;
  height: 1.5rem;
  padding: 5px;
  margin-bottom: 20px;
  border: 1.5px solid teal;
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
`

const TrashButton = styled.button`
  border: none;
  background-color: none;
  color: teal;
`

const UserTableList = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.user.users)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setSearch(newValue)
  }

  const handleUserAccess = async (_id: string) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/v1/admin/user-access/${_id}`)
      console.log(response)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Title>Baby on Board Products</Title>
      <ProductList>
        <Input value={search} onChange={handleChange} placeholder='Search a user here...' />
        <Table>
          <TableHead>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>User Access</th>
          </TableHead>
          {users
            .filter((user) => user.firstname.toLowerCase().includes(search))
            .map((user: UserType) => {
              return (
                <tr key={user._id}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <TrashButton
                      onClick={() => {
                        handleUserAccess(user._id)
                      }}
                    >
                      {user.isBanned ? (
                        <BlockOutlined style={{ color: 'teal' }} />
                      ) : (
                        <BlockOutlined style={{ color: 'red' }} />
                      )}
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
export default UserTableList
