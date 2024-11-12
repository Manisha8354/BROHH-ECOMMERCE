import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import UserContextProvider from '../context/UserContextProvider'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import not from '../assets/not-found.png'

export default function Wishlist() {
  let {auth} = useContext(UserContext)
  let [data, setData] = useState([])
  let [quantities, setQuantities] = useState({})
  let navigation = useNavigate()

  async function getData(){
      if(auth.username){
        let user = auth.username.email.split('@')[0]+'_pritam_wish'
        let result = await axios.get(`https://actl.co.in/pritam/getWish/${user}`)
        // console.log(result)
        let initialQuantities = {}
        result.data.forEach(item => {
          initialQuantities[item.id] = 1 // Initialize all quantities to 1
        })
        setData(result.data)
        setQuantities(initialQuantities)
      }
  }

  useEffect(()=>{
      getData()
  },[auth.username])

  async function  deleteCart(id) {
    let flag = confirm("are u sure to delete")
    if(flag){
        let user = auth.username.email.split('@')[0]+'_pritam_wish'
    await axios.delete(`https://actl.co.in/pritam/deleteCart/${id}/${user}`)
    window.location.reload()
    getData()
    }
  }

  // Handle the increment and decrement of quantity
  const handleQuantityChange = (id, delta) => {
    setQuantities(prevQuantities => {
      const updatedQuantities = {...prevQuantities}
      if(updatedQuantities[id] + delta > 0) {
        updatedQuantities[id] += delta
      }
      return updatedQuantities
    })
  }

  // Calculate totals
  let delievyCharge = 100
  let price = data.reduce((x , y) => x + JSON.parse(y.productPrice) * quantities[y.id], 0) || ''
  let afterDiscount = data.reduce((x , y) => x + JSON.parse(Math.ceil((y.productPrice - (y.productPrice * y.productDiscount) / 100)) * quantities[y.id]), 0) + delievyCharge || ''
  let saving = data.reduce((x , y) => x + JSON.parse(Math.ceil((y.productPrice * y.productDiscount) / 100) * quantities[y.id]), 0) || ''

  // Handle checkout
  const handleCheckout = async () => {
    // Prepare the cart data with updated quantities
    const cartData = data.map(item => ({
      productId: item.id,
      productTitle: item.productTitle,
      productPrice: item.productPrice,
      productDiscount: item.productDiscount,
      productImages: item.productImages,
      quantity: quantities[item.id],  // Include updated quantity
      totalPrice: Math.ceil(item.productPrice - (item.productPrice * item.productDiscount) / 100) * quantities[item.id],  // Calculate the total price for this item
    }))
   localStorage.setItem('cartData', JSON.stringify(cartData))
   navigation('/checkout')
  }
  // console.log(data)
// console.log(data)
  return (

      <div>
        {data.length > 0 ? 
      <section class="bg-white py-8 antialiased dummy:bg-gray-900 md:py-16">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 class="text-xl font-semibold text-gray-900 dummy:text-white sm:text-2xl">Your Wishlist</h2>

          <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div class="space-y-6">
                {data && data.map((item) => (
                  <div key={item.id} class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dummy:border-gray-700 dummy:bg-gray-800 md:p-6">
                    <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" class="shrink-0 md:order-1">
                        <img class="h-20 w-20 dummy:hidden" src={`${item.productImages}`} alt="product image" />
                      </a>

                      <div class="flex items-center justify-between md:order-3 md:justify-end">

                        <div class="text-end md:order-4 md:w-32">
                          <p class="text-base font-bold text-gray-900 dummy:text-white">Price:- ₹{Math.ceil(item.productPrice - (item.productPrice * item.productDiscount) / 100) * quantities[item.id]}</p>
                        </div>
                      </div>

                      <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <Link to={`/productpage/${item.productCode}`} class="text-base font-medium text-gray-900 hover:underline dummy:text-white">{item.productTitle}</Link>

                        <div class="flex items-center gap-4">
                        

                          <button onClick={()=>deleteCart(item.id)} type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dummy:text-red-500">
                          <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           
          </div>
        </div>
      </section> : 
      <div className='flex flex-col items-center pt-5'>
        <img src={not} alt="" />
        <h1 className='text-4xl font-bold py-8'>Your Wishlist is Empty..</h1>
      </div> }
    </div>
    
  )
}
