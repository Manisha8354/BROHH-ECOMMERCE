import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';

export default function DashboardShow({ title, value, onViewMore }) {
  let [data,setData] = useState({
    productLength:'',
    categoryLength:'',
    subCategoryLength:'',
    pendingOrder:'',
    deliveredOrder:'',
  })
  async function getProfile() {
    try {
      let result = await axios.get('https://actl.co.in/pritam/getProduct');
      let responce = await axios.get('https://actl.co.in/pritam/categoryget');
      let res = await axios.get('https://actl.co.in/pritam/subcategoryget');
      let order = await axios.get('https://actl.co.in/pritam/getOrder');
   let pending = order.data.filter(product => product.status === 'pending')
   let delivered = order.data.filter(product => product.status === 'Delivered')
        setData({ productLength: result.data.length, categoryLength: responce.data.length,subCategoryLength:res.data.length,pendingOrder: pending.length, deliveredOrder:delivered.length })
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(()=>{
getProfile()
  },[])
  // console.log(data)
  return (
    <>
      <AdminNav/>
      <AdminSidebar/>
    <div className='absolute ml-[300px] mt-[120px]'>
      <div className="flex flex-col gap-4">
        {/* Top Row: 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1st Card */}
          <div className="bg-blue-200 shadow-md rounded-lg p-4 flex flex-col gap-6 items-center h-40 w-full border border-gray-200">
            <div className="mb-3">
              <h2 className="text-xl font-bold text-gray-900">Total Product</h2>
            </div>
            <div>
              <h3 className="text-5xl font-semibold text-gray-800">{data.productLength ? data.productLength : '0'} </h3>
            </div>
          </div>
          {/* 2nd Card */}
          <div className="bg-blue-200 shadow-md rounded-lg p-4 flex flex-col gap-6 items-center h-40 w-full border border-gray-200">
            <div className="mb-3">
              <h2 className="text-xl font-bold text-gray-900">Total Category</h2>
            </div>
            <div>
            <h3 className="text-5xl font-semibold text-gray-800">{data.categoryLength ? data.categoryLength : '0'} </h3>
            </div>
          </div>
          {/* 3rd Card */}
          <div className="bg-blue-200 shadow-md rounded-lg p-4 flex flex-col gap-6 items-center h-40 w-full border border-gray-200">
            <div className="mb-3">
              <h2 className="text-xl font-bold text-gray-900">Total Sub-Category</h2>
            </div>
            <div>
            <h3 className="text-5xl font-semibold text-gray-800">{data.subCategoryLength ? data.subCategoryLength : '0'} </h3>
            </div>
          </div>
        </div>
        {/* Bottom Row: 2 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 4th Card */}
          <div className="bg-pink-200 shadow-md rounded-lg p-4 flex flex-col gap-6 items-center h-40 w-full border border-gray-200">
            <div className="mb-3">
              <h2 className="text-xl font-bold text-gray-900">Pending Orders</h2>
            </div>
            <div>
            <h3 className="text-5xl font-semibold text-gray-800">{data.pendingOrder ? data.pendingOrder : '0'} </h3>
            </div>
          </div>
          {/* 5th Card */}
          <div className="bg-green-200 shadow-md rounded-lg p-4 flex flex-col gap-6 items-center h-40 w-full border border-gray-200">
            <div className="mb-3">
              <h2 className="text-xl font-bold text-gray-900">Delivered Orders</h2>
            </div>
            <div>
            <h3 className="text-5xl font-semibold text-gray-800">{data.deliveredOrder ? data.deliveredOrder : '0'} </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
</>

  )
}
