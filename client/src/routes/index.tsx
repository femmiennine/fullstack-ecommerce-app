import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAppSelector } from '../app/hook'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminLogin from '../pages/admin/AdminLogin'
import VerifyUser from '../pages/user/VerifyUser'
import {
  Home,
  Login,
  Profile,
  Register,
  ForgetPassword,
  ResetPassword,
  Error,
} from '../pages/index'
import AddProduct from '../pages/admin/AddProduct'
import UpdateProduct from '../pages/admin/UpdateProduct'
import Users from '../pages/admin/Users'

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
              <Route path='/admin-login' element={<AdminLogin />}></Route>
            </>
          )}

          {isLoggedIn && (
            <>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/admin-dashboard' element={<AdminDashboard />}></Route>
              <Route path='/create-product' element={<AddProduct />}></Route>
              <Route path='/update-product/:productId' element={<UpdateProduct />}></Route>
              <Route path='/userslist' element={<Users />}></Route>
            </>
          )}

          <Route path='/verify-user/:token' element={<VerifyUser />}></Route>
          <Route path='/forget-password' element={<ForgetPassword />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>
          <Route path='*' element={<Error />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default UserRoute
