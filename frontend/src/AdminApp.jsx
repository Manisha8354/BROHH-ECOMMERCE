import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import UserContextProvider from './context/UserContextProvider';

export default function AdminApp() {
  return (
    <UserContextProvider>
    <Outlet/>
    </UserContextProvider>
  )
}
