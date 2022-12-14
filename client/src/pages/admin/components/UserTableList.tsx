import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hook'
import { BlockOutlined, Search } from '@mui/icons-material'
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

const UserList = styled.div`
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

const Button = styled.button`
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
      <UserList>
        <SearchContainer>
          <Input value={search} onChange={handleChange} placeholder='Search' />
          <Search style={{ color: 'gray', fontSize: 16 }} />
        </SearchContainer>
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
                    <Button
                      onClick={() => {
                        handleUserAccess(user._id)
                      }}
                    >
                      {user.isBanned ? (
                        <BlockOutlined style={{ color: 'teal' }} />
                      ) : (
                        <BlockOutlined style={{ color: 'red' }} />
                      )}
                    </Button>
                  </td>
                </tr>
              )
            })}
        </Table>
      </UserList>
    </Container>
  )
}
export default UserTableList
