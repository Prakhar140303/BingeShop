import React from 'react'
import {Outlet} from 'react-router-dom'
import ShoppingHeader from './header'
import Footer from './Footer.jsx'
function ShoppingLayout() {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        {/* common header */}
        <ShoppingHeader/>
        <main className='flex flex-col w-full'>
            <Outlet/>
        </main>
        <Footer />
    </div>
  )
}

export default ShoppingLayout