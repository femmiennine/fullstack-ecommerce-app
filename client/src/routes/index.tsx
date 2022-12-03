import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAppSelector } from '../app/hook'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminProducts from '../pages/admin/AdminProducts'
import CreateProduct from '../pages/admin/CreateProduct'
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
              <Route path='/admin-products' element={<AdminProducts />}></Route>
              <Route path='/create-product' element={<CreateProduct />}></Route>
              {/* <Route path="/products/:categories" element={<ProductList />}></Route>
              <Route path="/product/id" */}
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
