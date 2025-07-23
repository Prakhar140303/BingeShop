import { fetchCartProduct } from '@/store/shop/product-slice';
import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
function ShoppingCheckout() {
  const dispatch = useDispatch();
  const {cartProduct} = useSelector((state) => state.shopProduct);
  const {user} = useSelector((state) => state.auth);
  console.log({cartProduct});
  useEffect(()=>{
    dispatch(fetchCartProduct({userId :user.id}))
  },[dispatch,user]);

  return (
    <div className='flex flex-row w-full'>
      <div className='flex-2'>
          {
            cartProduct.map((product ,index) =>{
              return[
                <div className='' key={index}>
                  
                </div>
              ]
            })
          }
      </div>
      <div className='flex-1'></div>
    </div>
  )
}

export default ShoppingCheckout