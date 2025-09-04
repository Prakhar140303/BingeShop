import React, { use, useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getAddress } from '@/store/auth-slice';
import { Button } from '@/components/ui/button'; 
import { MapPinHouse , CircleX} from 'lucide-react'; 
import CommonForm from '../common/form';
import { addAddressFormElements } from '@/config';
import { addAddress } from '@/store/auth-slice';


const initialAddressValues = {
  label: "Home",   // default value
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};


function AddressPage() {
  const dispatch = useDispatch();
  const {addresses} =useSelector((state) => state.auth);
  const [addAddressModalOpen, setAddAddressModalOpen] = useState(false);
  const [isAddressAdding, setIsaddressAdding] = useState(false);
  const [formData,setFormData] = useState(initialAddressValues);
  const onSubmit = async (e) => {
  e.preventDefault();
  try {
    setIsaddressAdding(true);
    await dispatch(addAddress(formData));  
    await dispatch(getAddress());          
    setAddAddressModalOpen(false);         
    setFormData(initialAddressValues);
    setIsaddressAdding(false);   
  } catch (err) {
    setIsaddressAdding(false);   
    console.error("Failed to add address:", err);
  }
};
useEffect(()=>{
  dispatch(getAddress());
},[dispatch]);

  return (
    <div className='min-h-[78.2vh] p-2'>
      {
        isAddressAdding && (
          <div className='modal'>
            <div className='loader'></div>
          </div>
        )
      }
      {addAddressModalOpen && <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-51'>
        <div className='min-h-[70vh] min-w-[60vw] flex flex-col gap-2 p-4 md:p-8 bg-white rounded-2xl'>
          <div className='flex flex-row-reverse items-center w-full p-2' onClick={()=> setAddAddressModalOpen(false)}> <CircleX /></div>
          <CommonForm 
            formControls={addAddressFormElements}
              buttonText={'Add address'}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
          />
        </div>
      </div>}
      <div className='flex w-full flex-row-reverse p-4 '>
        <Button onClick ={()=>{setAddAddressModalOpen(true)}}>
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