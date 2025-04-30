import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function CheckAuth({isAuthenticated, user, children}) {
    const location = useLocation();
    console.log(isAuthenticated,user);
    if(!isAuthenticated ){ {
        if(!(location.pathname.includes('/login') || location.pathname.includes('/register')))return <Navigate to="/auth/login" />
      };
    }else{
        if((location.pathname.includes('/login') || location.pathname.includes('/register'))) {
            if(user?.role === 'admin') {
                return <Navigate to="/admin/dashboard" />
            }else{
                return <Navigate to="/shop/home" />
            }
        }
        if(user?.role !== 'admin' && location.pathname.includes('/admin')) {
            return <Navigate to="/unauth-page" />
        };
        if(user?.role === 'admin' && location.pathname.includes('/shop')) {
            return <Navigate to="/admin/dashboard" />
        }

    }
  return <div>{children}</div>

}

export default CheckAuth