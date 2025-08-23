import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getAddress } from '@/store/auth-slice';
import { Button } from '@/components/ui/button'; 
import { MapPinHouse } from 'lucide-react'; 
function AddressPage() {
  const dispatch = useDispatch();
  const {addresses} =useSelector((state) => state.auth);
  const [addAddressModalOpen, setAddAddressModalOpen] = React.useState(false);
  useEffect(() =>{
    dispatch(getAddress());
  },[]);
  return (
    <div className='min-h-[78.2vh]'>
      <div className='flex w-full flex-row-reverse p-4 '>
        <Button >
          Add address 
          <MapPinHouse />+
        </Button>
      </div>
      {
        addresses.length > 0 ? (
          <div className='flex flex-col gap-4 p-4 ow-y-auto'>
            {addresses.map((address, index) => (
              <div key={index} className='p-4 border rounded-lg shadow-md bg-slate-50'>
                <h3 className='text-lg font-semibold'>{address.label}</h3>
                <p>{address.street}, {address.city}, {address.state}, {address.postalCode}</p>
                <p>{address.country}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center p-4'>No addresses found.</div>
        )
      }
    </div>
  )
}

export default AddressPage