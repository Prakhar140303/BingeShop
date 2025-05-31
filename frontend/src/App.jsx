import { useEffect } from 'react'
import { Routes, Route,Navigate } from 'react-router-dom'
import AuthLayout from './components/auth/Layout.jsx'
import AuthLogin from './pages/auth/login.jsx'
import AuthRegister from './pages/auth/register.jsx'
import AdminLayout from './components/admin-view/layout.jsx'
import AdminDashboard from './pages/admin-view/dashboard.jsx'
import AdminOrders from './pages/admin-view/orders.jsx'
import AdminFeatures from './pages/admin-view/features.jsx'
import AdminProducts from './pages/admin-view/products.jsx'
import ShoppingLayout from './components/shopping-view/layout.jsx'
import ShoppingHome from './pages/shopping-view/home.jsx'
import ShoppingListing from './pages/shopping-view/listing.jsx'
import ShoppingCheckout from './pages/shopping-view/checkout.jsx'
import ShoppingAccount from './pages/shopping-view/account.jsx'
import NotFound from './pages/not-found/index.jsx'
import CheckAuth from './components/common/check-auth.jsx'
import UnauthPage from './pages/unauth-page/index.jsx'
import { useSelector,useDispatch } from 'react-redux'
import { checkAuth } from './store/auth-slice/index.js'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
function App() {
  const {isAuthenticated,user,isLoading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log("IN app : ",{user});
  useEffect(() => {
    console.log('check auth');
    dispatch(checkAuth())
  }, [dispatch])
  if (isLoading) {
    return  <div  className='flex justify-center items-center w-screen h-screen'>
      <DotLottieReact
        src="https://lottie.host/49dfed84-f8da-429e-8178-fb9fbbeed332/oF5DA2DoVS.lottie"
        loop
        autoplay
        className='size-60'
      />
    </div>
  }
  return ( 
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path='/auth' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout/>
        </CheckAuth>}>
          <Route path='login' element={<AuthLogin/>} />
          <Route path='register' element={<AuthRegister/>} />
        </Route>
        <Route path='/admin' element ={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>
          }>
            <Route path='dashboard' element={<AdminDashboard/>} />
            <Route path='orders' element={<AdminOrders/>} />
            <Route path='products' element={<AdminProducts/>} />
            <Route path='features' element={<AdminFeatures/>} />
        </Route>
        <Route path='/shop' element ={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
          }>
            <Route path='home' element={<ShoppingHome/>} />
            <Route path='listing' element={<ShoppingListing/>} />
            <Route path='checkout' element={<ShoppingCheckout/>} />
            <Route path='account' element={<ShoppingAccount/>} />
        </Route>
        <Route path='/unauth-page' element={<UnauthPage/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
