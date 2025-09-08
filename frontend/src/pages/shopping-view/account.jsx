  import React,{useState} from 'react'

  import { Separator } from '@/components/ui/separator'
  import AccountPage from '@/components/shopping-view/AccountPage';
  import AddressPage from '@/components/shopping-view/AddressPage';
  import OrderPage from '@/components/shopping-view/OrderPage';
  function ShoppingAccount() {
    let [option, setOption] = useState('account');
    return (
      <div className='flex flex-row gap-6 px-2 min-h-[80vh]  bg-slate-100'>
        {/* side bar */}
        <div className='flex-[1] md:flex hidden flex-col '>
          <div className='text-2xl font-bold  hover:cursor-pointer p-4 py-8 hover:bg-slate-200' onClick={()=>setOption('account')}>Account Settings</div>
          <Separator />
          <div className='text-2xl font-bold  hover:cursor-pointer p-4 py-8 hover:bg-slate-200'onClick={()=>setOption('address')}>Address</div>
          <Separator />
          <div className='text-2xl font-bold  hover:cursor-pointer p-4 py-8 hover:bg-slate-200' onClick={()=>setOption('order')}>Orders</div>
          <Separator />

        </div>
        {/* main content */}
        <div className='flex-[4]'>
          {
            option === 'account' && <AccountPage setOption = {setOption}/>
          } 
          {
            option === 'address' && <AddressPage/>
          }
          {
            option === 'order' && <OrderPage />
          }
        </div>
      </div>
    )
  }

  export default ShoppingAccount