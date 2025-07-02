import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router'
function ShoppingHome() {
  const navigate = useNavigate() ;
  return (
   <div>
    <div className='flex md:flex-row flex-col justify-around items-center'>
      <div className='flex flex-col justify-center items-center gap-4'>
        <h1 className='md:text-5xl text-4xl font-extrabold max-w-[600px]'>Discover the Best Deals on Your Favorite Products!</h1>
        <h2 className='md:text-2xl text-xl font-semibold max-w-[600px]'>From gadgets to groceries — everything you love, in one place.</h2>
        <div className='flex flex-row  justify-around w-full'>
          <motion.button className='bg-primary text-white px-4 py-3 text-lg rounded-lg hover:shadow-xl min-w-[150px]' initial={{scale : 1}} whileHover={{scale : 1.05}}
          onClick={() => navigate('/shop/listing') }>Shop Now</motion.button>
          <motion.button className='bg-primary text-white px-4 py-3 text-lg rounded-lg hover:shadow-xl'initial={{scale : 1}} whileHover={{scale : 1.05}}>Explore Categories</motion.button>

        </div>

      </div>



      <div><img src='/watchHover.png' alt='shopping-home' className='max-h-[400px] animate-float ' /></div>
    </div>
   </div>
  )
}

export default ShoppingHome