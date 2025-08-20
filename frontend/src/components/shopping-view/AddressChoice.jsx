import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { getAddress } from '@/store/auth-slice';


function AddressChoice({setaddress,setSelectedAddress}) {
    const { addresses } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAddress());
    },[]);
    const handlesetaddress = (address) => {
        setaddress(address);
        setSelectedAddress(false);
    }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <div className='bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3'>
            <h2 className='text-2xl font-bold mb-4'>Choose an Address</h2>
            <div className='flex flex-col gap-4'>
                {addresses?.map((address, index) => (
                    <div key={index} className='p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100' onClick={() => handlesetaddress(address)}>
                        <h3 className='text-lg font-semibold'>{address.label}</h3>
                        <p>{address.street}, {address.city}, {address.state}, {address.postalCode}</p>
                        <p>{address.country}</p>
                    </div>  
                ))
                }
            </div>
        </div>
        
    </div>
  )
}

export default AddressChoice