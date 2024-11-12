import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';

export default function Orders() {
  const [data, setData] = useState([]);

  async function getProfile() {
    try {
      let result = await axios.get('https://actl.co.in/pritam/getOrder');
      if(result){
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getProfile();
  }, []); // Empty dependency array to fetch data only once

  // Handler functions
  const handleDelete = async (id) => {
    let flag = confirm("Are you Sure to Delete")
    if(flag){
     await axios.delete(`https://actl.co.in/pritam/deleteProduct/${id}`);
     getProfile()
    }
  };

  async function handleUpdate(data, id) {
    let flag = confirm("Are U sure to Change Status")
    if(flag){
    await axios.put(`https://actl.co.in/pritam/updateOrder/${id}`, {
        'status':data
    });
    getProfile()
    }
  }
  console.log(data)
  return (
    <>
    <AdminNav/>
    <AdminSidebar/>
    <div className='absolute flex flex-col items-center w-[80%] left-[20%] top-20'>
     
      <div className="h-auto w-full rounded-lg bg-pink-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Orders List</h1>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">No.</th>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">customer_address</th>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">customer_phone</th>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">customer_email</th>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">payment_method</th>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">product_id</th>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">product_title</th>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">quantity</th>
            {/* <th className="py-2 px-4 bg-gray-200 font-bold text-left">product_price</th> */}
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">total_price</th>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">status</th>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="py-2 px-4">{index +1}</td>
              <td className="py-2 px-4">{product.customer_address}</td>
              <td className="py-2 px-4">{product.customer_phone}</td>
              <td className="py-2 px-4">{product.customer_email}</td>
              <td className="py-2 px-4">{product.payment_method}</td>
              <td className="py-2 px-4">{product.product_id}</td>
              <td className="py-2 px-4">{product.product_title}</td>
              <td className="py-2 px-4">{product.quantity}</td>
              {/* <td className="py-2 px-4">{product.product_price}</td> */}
              <td className="py-2 px-4">{product.total_price}</td>
              <td className="py-2 px-4">{product.status}</td>
              <td className="py-2 px-4">
                <div className="flex space-x-2">
                    {product.status == 'pending' ? <button
                        onClick={()=>handleUpdate("Delivered", product.id)}
                        className="inline-block bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-red-400 transition-transform duration-300 transform hover:scale-110"
                      >
                        Delivered
                </button>:<button
                        onClick={()=>handleUpdate("pending", product.id)}
                        className="inline-block bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-red-400 transition-transform duration-300 transform hover:scale-110"
                      >
                        pending
                </button> }
                
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    </div>
    </>
  );
}
