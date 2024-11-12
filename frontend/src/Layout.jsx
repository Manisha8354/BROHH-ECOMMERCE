import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import UserContextProvider from './context/UserContextProvider'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios'
import { IoCloseOutline } from 'react-icons/io5'
export default function Layout() {
  const [orderPopup, setOrderPopup] = React.useState(false);
  let [data, setData] = React.useState('')
  // let {auth} = useContext(UserContext)
// setInterval(()=>{
// setOrderPopup(true)
// },2000)

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();

  
  }, []);
async function getPopup() {
  let result = await axios.get('https://actl.co.in/pritam/viewPopup')
setData(result.data[0])
}
  useEffect(()=>{
getPopup()
  },[])
  
useEffect(()=>{
if(data.status == "on"){
  // Show the order popup 3 seconds after the component mounts
  const timer = setTimeout(() => {
    setOrderPopup(true);
  }, 3000);

  // Cleanup function to clear the timer
  return () => clearTimeout(timer);
}
},[data])
  return (
    <UserContextProvider>
      <Navbar/>
      <Outlet/>
      <Footer/>
      {orderPopup &&   <div className="">
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white text-center dark:bg-gray-900 rounded-md duration-200 w-[300px]">
              {/* header */}
              <div className="flex items-center justify-between bg-orange-400 p-2">
                <div>
                  <h1>{data ? data.heading : ''}</h1>
                </div>
                <div>
                  <IoCloseOutline
                    className="text-2xl cursor-pointer "
                    onClick={() => setOrderPopup(false)}
                  />
                </div>
              </div>
              {/* form section */}
              <div className="mt-4">
                <p>{data ? data.detail : ''}</p>
              </div>
            </div>
          </div>
        </div>}
    </UserContextProvider>
  )
}
