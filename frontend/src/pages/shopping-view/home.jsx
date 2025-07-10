import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'; 
import ShoppingProductTile from '../../components/shopping-view/product-tile'
import { fetchAllProduct } from '@/store/shop/product-slice';
function ShoppingHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {allProduct} = useSelector((state) => state.shopProduct); 
  console.log({allProduct})
  const brandLogos = [
    "https://cdn.brandfetch.io/nike.com/w/512/h/178/logo?c=1id83BrBUv9aNb1zf02",
    "https://cdn.brandfetch.io/puma.com/w/512/h/254/logo?c=1id83BrBUv9aNb1zf02",
    "https://cdn.brandfetch.io/adidas.com/w/512/h/302/logo?c=1id83BrBUv9aNb1zf02",
    "https://cdn.brandfetch.io/hm.com/w/512/h/338/logo?c=1id83BrBUv9aNb1zf02",
    "https://cdn.brandfetch.io/zara.com/w/512/h/213/logo?c=1id83BrBUv9aNb1zf02",
    "https://cdn.brandfetch.io/levi.com/w/400/h/400?c=1id83BrBUv9aNb1zf02"
  ];

  const repeatedLogos = [...brandLogos, ...brandLogos]; // duplicate for seamless loop
  useEffect(() => {
    dispatch(fetchAllProduct({}));
  },[dispatch])
  return (
    <div className='flex flex-col gap-6'>
      {/* Hero Section */}
      <div className='flex md:flex-row-reverse flex-col m-4 py-4 px-2 justify-around items-center bg-[#E1D9EA] rounded-xl'>
        <div>
          <img src='/watchHover.png' alt='shopping-home' className='md:max-h-[400px] max-h-[200px] animate-float' />
        </div>

        <div className='flex flex-col justify-center items-center gap-4'>
          <h1 className='md:text-5xl text-4xl font-extrabold max-w-[600px] text-center'>
            Discover the Best Deals on Your Favorite Products!
          </h1>
          <h2 className='md:text-2xl text-xl font-semibold max-w-[600px] text-center'>
            From gadgets to groceries — everything you love, in one place.
          </h2>
          <div className='flex flex-row justify-around w-full'>
            <motion.button
              className='bg-primary text-white px-4 py-3 md:text-lg text-sm  rounded-lg hover:shadow-xl md:min-w-[150px] min-w-[100px]'
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/shop/listing')}
            >
              Shop Now
            </motion.button>
            <motion.button
              className='bg-primary text-white px-4 py-3 md:text-lg text-sm rounded-lg hover:shadow-xl md:min-w-[150px] min-w-[100px]'
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              Explore Categories
            </motion.button>
          </div>
        </div>

        
      </div>

      <div className="relative overflow-hidden h-24 w-full mt-10 bg-[#e3e8f9] flex justify-center items-center" >
        <motion.div
          className="flex gap-12 w-max items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 16,
          }}
        >
          {repeatedLogos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Brand ${index}`}
              className="w-28 h-16 object-contain"
            />
          ))}
        </motion.div>
      </div>
          <div className='flex flex-row gap-4 justify-around bg-[#E1D9EA] my-2 overflow-x-auto rounded-lg'>
            {
              allProduct.filter(product => product.salePrice >0).map((product) => (
                <div className=' w-[300px] py-12'>
                  <ShoppingProductTile key={product._id} product={product} isHome ={true} />
                </div>
              ))
            }
          </div>
      <div className='flex flex-col md:flex-row justify-around items-center h-[320px]'>
          <div>
            <img src="/shoeHover.png" alt=""  className='md:max-h-[300px] max-h-[200px] animate-float'/>
          </div>
          
      </div>
    </div>
  );
}

export default ShoppingHome;
