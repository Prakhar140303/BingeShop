import CommonForm from '@/components/common/form';
import { LoginFormControls } from '@/config';
import React,{ useState} from 'react'
import {Link} from 'react-router-dom'
function AuthLogin() {
  const initialState = {
    email : '',
    password : '',
  }
  const [formData,setFromData] = useState(initialState);
  function onSubmit(e){
     
  }
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign-in to your account</h1>
      </div>
      <CommonForm
        formControls={LoginFormControls}
        buttonText={'Sign up'}
        formData={formData}
        setFormData={setFromData}
        onSubmit={onSubmit}
      />
      <p className='mt-2'>Don't have an account
        <Link className='font-medium ml-2 text-primary hover:underline' to ="/auth/register">Register</Link>
      </p>
    </div>
  )
}

export default AuthLogin