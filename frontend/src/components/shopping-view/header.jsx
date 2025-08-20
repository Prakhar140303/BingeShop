import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {House ,Menu, ShoppingCart, CircleUser, LogOut} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useSelector, useDispatch } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import {DropdownMenu, DropdownMenuTrigger,
   DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { logoutUser } from '@/store/auth-slice' 
import {motion} from 'framer-motion'
function capitalize(str) {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
function MenuItem(){
  return <nav className='flex flex-col mb-3 lg:mb-0 
    lg:items-center gap-6 lg:flex-row'>
      {
        shoppingViewHeaderMenuItems.map(MenuItem =>(
          <Link to={MenuItem.path} 
          key={MenuItem.id} className='text-muted-foreground hover:text-foreground'>{MenuItem.label}</Link>
        ))
      }
  </nav>
}
function HeaderRightContent(){
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  }
  return <div className='flex lg:items-center lg:flex-row flex-col gap-4 '>
    <motion.div initial={{scale:1}} whileHover={{scale :1.15}}> 
      <Button varient='outline' size='icon' onClick ={()=>{navigate('/shop/checkout')}}>
        <ShoppingCart className='size-6'/>
        <span className='sr-only'>User Cart</span>
      </Button>

    </motion.div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='bg-black'>
          <AvatarFallback className='bg-black
              text-white font-extrabold'>
              {user?.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='right' className='w-56 min-h-20'>
        <DropdownMenuLabel>Logged in as <strong>{capitalize(user?.username)}</strong></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='flex flex-row hover:cursor-pointer' onClick={() => navigate('/shop/account')}>
          <CircleUser  className='mr-2 size-6 '/>
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='flex flex-row hover:cursor-pointer' onClick={() => handleLogout()}>
          <LogOut className='mr-2 size-6'/>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
}
function ShoppingHeader() {
  const { user} = useSelector((state) => state.auth);
  console.log("IN header : ",{user});
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background bg-slate-100'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to='/shop/home' className='flex items-center gap-2'>
        <House  className='size-10'/>
        <span className='font-bold'>BingeShop</span>
        </Link> 
        <Sheet>
          <SheetTrigger asChild>
            <Button varient='outline' size='icon' className='lg:hidden'>
              <Menu />
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side = 'left' className='w-full max-w-xs'>
            <MenuItem/>
            <HeaderRightContent/>
          </SheetContent>
        </Sheet>
        <div className='hidden lg:block '> 
          <MenuItem/>
        </div>

          <div className='hidden lg:block'>
            <HeaderRightContent/>
          </div>
      </div>
    </header>
  )
}

export default ShoppingHeader