import React, { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { Navigate } from 'react-router-dom'

export default function Protected({children}) {
let flag  = localStorage.getItem('token')
 if(flag) {
    return children
 }else{
    return <Navigate to='/signinsignup'/>
 }
}