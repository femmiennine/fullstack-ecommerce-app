import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAppSelector } from '../app/hook'
import { Announcement, Navbar } from '../components'
import {
  Home,
  Login,
  Profile,
  Register,
  VerifyUser,
  ForgetPassword,
  ResetPassword,
  Error,
  Footer,
} from '../pages/index'

const Index = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
  return (
    <BrowserRouter>
      <Announcement />
      <Navbar />
      <Routes>
        <Route>
          <Route path='/' element={<Home />}></Route>

          {!isLoggedIn && (
            <>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/login' element={<Login />}></Route>
            </>
          )}

          {isLoggedIn && <Route path='/profile' element={<Profile />}></Route>}

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
