import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAppSelector } from '../app/hook'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminHomepage from '../pages/admin/AdminDashboard'
import {
  Home,
  Login,
  Profile,
  Register,
  VerifyUser,
  ForgetPassword,
  ResetPassword,
  Error,
} from '../pages/index'

const UserRoute = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path='/' element={<Home />}></Route>

          {!isLoggedIn && (
            <>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/admin' element={<AdminLogin />}></Route>
            </>
          )}

          {isLoggedIn && <Route path='/profile' element={<Profile />}></Route>}
          <Route path='/admin-dashboard' element={<AdminHomepage />}></Route>
          <Route path='/verify-user/:_id' element={<VerifyUser />}></Route>
          <Route path='/forget-password' element={<ForgetPassword />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>
          <Route path='*' element={<Error />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default UserRoute
