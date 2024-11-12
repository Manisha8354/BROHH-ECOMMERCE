import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../context/UserContext'

export default function AdminProtected({children}) {
 let {adminflag} = useContext(UserContext)

 if(adminflag) {
    return children
 }else{
    return <Navigate to='/admin/adminlogin'/>
 }
}