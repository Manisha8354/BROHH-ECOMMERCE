import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';

export default function Banner() {
  const [data, setData] = useState([]);

  async function getProfile() {
    try {
      let result = await axios.get('https://actl.co.in/pritam/getbanner');
    //   console.log(result)
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
     await axios.delete(`https://actl.co.in/pritam/deletebanner/${id}`);
     getProfile()
    }
  };

  return (
    <>
    <AdminNav/>
    <AdminSidebar/>
    <div className='absolute flex flex-col items-center w-[80%] left-[20%] top-20'>
      <Link to='/admin/newbanner' className='p-3 rounded-lg bg-sky-700 m-5 text-white font-bold hover:bg-black'>Add New Banner</Link>
      <div className="h-auto w-full rounded-lg bg-pink-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Banner List</h1>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">No.</th>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">Banner</th>
            {/* <th className="py-2 px-4 bg-gray-200 font-bold text-left">Category</th>
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">Sub-Category</th> */}
            <th className="py-2 px-4 bg-gray-200 font-bold text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="py-2 px-4">{index +1}</td>
              <td className="py-2 px-4"><img src={`https://actl.co.in/pritam_uploads/${product.banner}`} alt="" className='w-96'/></td>
              {/* <td className="py-2 px-4">{product.productCategory}</td>
              <td className="py-2 px-4">{product.productSubCategory}</td> */}
              <td className="py-2 px-4">
                <div className="flex space-x-2">
             
                <button
                        onClick={() => handleDelete(product.id)}
                        className="inline-block bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-red-400 transition-transform duration-300 transform hover:scale-110"
                      >
                        Delete
                </button>
              
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
