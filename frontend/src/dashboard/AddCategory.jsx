import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';

export default function AddCategory() {
  let navigation = useNavigate()
  const [data, setData] = useState({
    categoryName: '',
    categoryType: '',
    categoryDetails: ''
  });

  async function saveCategory(e) {
    e.preventDefault()
    try {
      let result = await axios.post('https://actl.co.in/pritam/categorysave', data);
      navigation('/admin/category')
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const [category, setCategory] = useState([]);
  async function getCategory() {
    let result = await axios.get('https://actl.co.in/pritam/subcategoryget')
    setCategory(result.data)
    // console.log(result)
}
useEffect(() => {
    getCategory()
}, [])

  return (
    <>
      <AdminNav />
      <AdminSidebar />
      <div className='absolute flex flex-col items-center w-[80%] left-[20%] top-20'>
        <div className="h-auto w-1/2 rounded-lg bg-pink-100">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-extrabold mb-6 text-center transition-transform duration-300 transform hover:scale-110 text-pink-700">
              New Sub-Category
            </h2>
            <form action="" method="post" className='px-10'>
              <div className='flex flex-col'>
                <label htmlFor="" className='text-2xl font-semibold'>Sub-Category Name :-</label>
                <input type="text" placeholder='Enter category name' className='py-2 px-1 rounded-sm mt-2' onChange={(e) => setData({ ...data, categoryName: e.target.value })} />
              </div>
              <div className='flex flex-col mt-8'>
                <label htmlFor="" className='text-2xl font-semibold'>Type:-</label>
                <select name="productCategory" onChange={(e) => setData({ ...data, categoryDetails: e.target.value })} id="" className='w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
                  <option>select Type</option>
                  <option>regular</option>
                  <option>influencer</option>

                </select>
              </div>
              <div className='flex flex-col mt-8'>
                <label htmlFor="" className='text-2xl font-semibold'>Select Category :-</label>
                <select name="categoryType" onChange={(e) => setData({ ...data, categoryType: e.target.value })} id="" className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
                  <option value='dummy'>select category</option>
                  {category.map((item, index) => (
                    <option value={item.categoryName} className='uppercase' key={index}>{item.categoryName}</option>
                  ))}
                </select>
              </div>
              <button onClick={saveCategory} className='p-3 rounded-lg bg-sky-700 my-5 text-white font-bold hover:bg-black'>Submit</button>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}
