import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function YourOrder() {
  let {auth} = useContext(UserContext)
  let [data, setData] = useState([])
  let [quantities, setQuantities] = useState({})
  let navigation = useNavigate()

  async function getData(){
      if(auth.username){
        let user = auth.username.email
        let result = await axios.get(`https://actl.co.in/pritam/getOrderByEmail/${user}`)
        setData(result.data)
      }
  }

  useEffect(()=>{
      getData()
  },[auth.username])

  return (
    <div>
      <section class="bg-white py-8 antialiased dummy:bg-gray-900 md:py-16">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 class="text-xl font-semibold text-gray-900 dummy:text-white sm:text-2xl">Your Orders</h2>

          <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div class="space-y-6">
                {data && data.map((item) => (
                  <div key={item.id} class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dummy:border-gray-700 dummy:bg-gray-800 md:p-6">
                    <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                     

                      <div class="flex items-center justify-between md:order-3 md:justify-end">
                       
                        <div class="text-end md:order-4 md:w-32">
                          <p class="text-base font-bold text-gray-900 dummy:text-white">Price:- ₹{item.total_price}</p>
                        </div>
                      </div>
                          <div>
                            <img src={item.productImage} alt="" className='w-32'/>
                          </div>
                      <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <h1  class="text-base font-medium text-gray-900  dummy:text-white">{item.product_title}</h1>

                        <div class="flex items-center gap-4">
                          
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           
          </div>
        </div>
      </section>
    </div>
  )
}
