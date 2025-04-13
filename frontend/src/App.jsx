import { Routes, Route } from 'react-router-dom'
import AuthLayout from './components/auth/layout.jsx'
import AuthLogin from './pages/auth/login.jsx'
import AuthRegister from './pages/auth/register.jsx'
import AdminLayout from './components/admin-view/layout.jsx'
import AdminDashboard from './pages/admin-view/dashboard.jsx'
import AdminOrders from './pages/admin-view/orders.jsx'
import AdminFeatures from './pages/admin-view/features.jsx'
function App() {

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <h1>Header Component</h1>
      <Routes>
        <Route path='/auth' element={<AuthLayout/>}>
          <Route path='login' element={<AuthLogin/>} />
          <Route path='register' element={<AuthRegister/>} />
        </Route>
        <Route path='/admin' element ={<AdminLayout/>}>
            <Route path='dashboard' element={<AdminDashboard/>} />
            <Route path='orders' element={<AdminOrders/>} />
            <Route path='products' element={<AdminOrders/>} />
            <Route path='features' element={<AdminFeatures/>} />

        </Route>
      </Routes>
    </div>
  )
}

export default App
