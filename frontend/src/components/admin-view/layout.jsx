import React,{ useState} from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from './sidebar.jsx'
import AdminHeader from './header.jsx'
function AdminLayout() {
  const [opensidebar, setOpenSidebar] = useState(false);
  return (
    <div className='flex min-h-screen w-full'>
        <AdminSideBar open={opensidebar} setOpen={setOpenSidebar}/>
        <div className='flex flex-1 flex-col'>
            <AdminHeader setOpen={setOpenSidebar}/>
            <main className='flex-1 flex bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default AdminLayout