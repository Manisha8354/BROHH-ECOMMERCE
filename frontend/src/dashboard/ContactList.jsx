import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';

export default function ContactList() {
  const [data, setData] = useState([]);

  async function getProfile() {
    try {
      let result = await axios.get('https://actl.co.in/pritam/getContact');
      console.log(result)
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
  return (
    <>
    <AdminNav/>
    <AdminSidebar/>
    <div className='absolute flex flex-col items-center w-[80%] left-[20%] top-20'>
     
      <div className="h-auto w-full rounded-lg bg-pink-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact List</h1>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">No.</th>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">name</th>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">email</th>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">Message</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="py-2 px-4">{index +1}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.email}</td>
              <td className="py-2 px-4">{product.message}</td>
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
