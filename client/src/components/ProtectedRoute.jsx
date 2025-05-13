
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContextProvider'

function ProtectedRoute({children}) {
    let {isAuthenticated} = useAuth();
  
  
  if(!isAuthenticated){
    return <Navigate to= '/login' replace/>

  }
  return children
}

export default ProtectedRoute

