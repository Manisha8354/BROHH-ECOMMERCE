import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';

export default function Category() {
  const [data, setData] = useState([]);

  async function getProfile() {
    try {
      let result = await axios.get('https://actl.co.in/pritam/categoryget');
      setData(result.data);
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
     await axios.delete(`https://actl.co.in/pritam/categorydelete/${id}`);
      getProfile()
    }
  };

  const handleEdit = (id) => {
    // Implement edit logic
    console.log('Edit item with id:', id);
  };

  const handleUpdate = (id) => {
    // Implement update logic
    console.log('Update item with id:', id);
  };

  return (
    <>
    <AdminNav/>
    <AdminSidebar/>
    <div className='absolute flex flex-col items-center w-[80%] left-[20%] top-20'>
      <Link to='/admin/newcategory' className='p-3 rounded-lg bg-sky-700 m-5 text-white font-bold hover:bg-black'>Add New Sub-Category</Link>
      <div className="h-auto w-3/4 rounded-lg bg-pink-100">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center transition-transform duration-300 transform hover:scale-110 hover:text-pink-700">
            Sub-Category
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub-Category Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub-Category Details </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Action </th>
                  
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.categoryName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.categoryType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.categoryDescription}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="inline-block bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-red-400 transition-transform duration-300 transform hover:scale-110"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
