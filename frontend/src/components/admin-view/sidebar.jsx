import React, { Fragment } from 'react'
import { ChartBarDecreasing, ClipboardList, LayoutDashboard, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import {Sheet, SheetContent, SheetHeader, SheetTitle} from '@/components/ui/sheet'
const adminSidebarMenuItems = [
  {
      id: 'dashBoard',
      label : 'DashBoard',
      path : '/admin/dashboard',
      icon : <LayoutDashboard />
  },
  {
      id: 'products',
      label : 'Products',
      path : '/admin/products',
      icon : <ShoppingCart />
  },
  {
      id: 'orders',
      label : 'Orders',
      path : '/admin/orders',
      icon : <ClipboardList />
  },
]
function MenuItems({setOpen}){
  const navigate = useNavigate();
  return <nav className='mt-8 flex-col flex gap-2'>
    {
      adminSidebarMenuItems.map(menuItem => {
        return (
          <motion.div key ={menuItem.id} whileHover={{scale : 1.1}} whileTap={{scale : 0.9}} onClick={()=>{ 
            navigate(menuItem.path);
            setOpen(false);
          }} className='flex cursor-pointer rounded-md px-3 py-2 items-center gap-2
          text-muted-foreground hover:bg-muted hover:text-foreground'>
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </motion.div>
        )
      })
    }
  </nav>
}
function AdminSideBar({open,setOpen}) {
  const navigate = useNavigate();
  
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left' className='w-64'>
          <div className='flex flex-col h-full'>
            <SheetHeader className='border-b'>
                <SheetTitle className='flex gap-2 mb-5'>
                  <ChartBarDecreasing />
                  <span className='text-xl   font-extrabold '>

                  Admin Panel
                  </span>
                </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen = {setOpen} />
          </div>
        </SheetContent>
      </Sheet>
       <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div onClick = {() => navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2'>
            <ChartBarDecreasing />
            <h1 className='text-xl   font-extrabold '>
              Admin Panel
            </h1>
        </div>
        <MenuItems />
       </aside> 
    </>

  )
}

export default AdminSideBar