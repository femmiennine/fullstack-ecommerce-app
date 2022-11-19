import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Announcement } from '../components'
import {
  Home,
  Login,
  Profile,
  Register,
  VerifyUser,
  ForgetPassword,
  ResetPassword,
  Error,
  Navbar,
  Footer,
} from '../pages/index'

const Index = () => {
  return (
    <BrowserRouter>
      <Announcement />
      <Navbar />
      <Routes>
        <Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/verify-user/:_id' element={<VerifyUser />}></Route>
          <Route path='/forget-password' element={<ForgetPassword />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>
          <Route path='*' element={<Error />}></Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
export default Index
