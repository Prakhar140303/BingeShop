import CommonForm from '@/components/common/form';
import { LoginFormControls } from '@/config';
import React,{ useState} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/auth-slice';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
function AuthLogin() {
  const initialState = {
    email : '',
    password : '',
  }
  const [formData,setFormData] = useState(initialState);
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();
  function onSubmit(event){
    event.preventDefault();
    
    dispatch(loginUser(formData)).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        toast({
          title : data?.payload?.message,
        })
        console.log("login first : ",data?.payload?.user);
        if(data?.payload?.user?.role === 'admin'){
          navigate('/admin/dashboard');
        } 
        else
          navigate('/shop/home');
      }else{
        toast({
          title : data?.payload?.message,
          variant : 'destructive',
        })
      }
    });
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
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <p className='mt-2'>Don't have an account
        <Link className='font-medium ml-2 text-primary hover:underline' to ="/auth/register">Register</Link>
      </p>
    </div>
  )
}

export default AuthLogin