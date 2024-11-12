import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';

export default function AddSubCategory() {
    let navigation = useNavigate()
    let [loading, setLoading] = useState(false)
    const [imagePreviews, setImagePreviews] = useState([]);
  const [data, setData] = useState({
    categoryName:'',
    subcategoryName:'',
  });
  const [subcategoryImage, setsubcategoryImage] = useState(null);
  const handleImageChange = (e) => {
    setsubcategoryImage(e.target.files[0]);

    // Generate image previews
    const imagePreviews =  URL.createObjectURL(e.target.files[0]);
    setImagePreviews(imagePreviews);
};
  async function saveSubCategory(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append('categoryName', data.categoryName);
    formData.append('subcategoryName', data.subcategoryName);
    formData.append('subcategoryImage', subcategoryImage);

    try {
        setLoading(true)
        await axios.post('https://actl.co.in/pritam/subcategorysave', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        navigation('/admin/subcategory')
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }

  }
  const [category, setCategory] = useState([]);


  async function getCategory() {
    let result = await axios.get('https://actl.co.in/pritam/categoryget')
    setCategory(result.data)
    // console.log(result)
}
useEffect(() => {
    getCategory()
}, [])

  return (
    <>
    <AdminNav/>
    <AdminSidebar/>
    <div className='absolute flex flex-col items-center w-[80%] left-[20%] top-20'>
      <div className="h-auto w-1/2 rounded-lg bg-pink-100">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-4xl font-extrabold mb-6 text-center transition-transform duration-300 transform hover:scale-110 text-pink-700">
           New Category
          </h2>
            <form action="" method="post" className='px-10'>
            <div className="flex flex-col mb-5">
                            <label className="block text-gray-700 font-bold mb-2"> Category</label>
                            <input type="text" placeholder='Enter category name' className='py-2 px-1 rounded-sm mt-2' onChange={(e)=>setData({...data, categoryName: e.target.value})}/>
                            {/* <select name="productCategory" onChange={(e)=>setData({...data,categoryName :e.target.value})} id="" className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
                                <option value='dummy'>select category</option>
                                {category.map((item, index) => (
                                    <option value={item.categoryName} className='uppercase' key={index}>{item.categoryName}</option>
                                ))}
                            </select> */}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-2xl font-semibold'>Select Type :-</label>
                    <select name="productCategory" onChange={(e)=>setData({...data,subcategoryName :e.target.value})} id="" className='w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
                                <option>select Type</option>
                                <option>regular</option>
                                <option>influencer</option>
                                
                            </select>
                    {/* <input type="text" placeholder='Enter category name' className='py-2 px-1 rounded-sm mt-2' onChange={(e)=>setData({...data, subcategoryName: e.target.value})}/> */}
                </div>
                <div className='flex flex-col mt-8'>
                     {/* Image Preview Section */}
                     {imagePreviews.length > 0 && (
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Image Previews</label>
                                <div className="flex flex-wrap">
                                    {/* {imagePreviews.map((preview, index) => ( */}
                                        <div className="mr-4 mb-4">
                                            <img src={imagePreviews} alt={`Preview`} className="w-36 h-32 object-fit rounded-md shadow-md" />
                                        </div>
                                    {/* ))} */}
                                </div>
                            </div>
                        )}

                        {/* Product Images */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Banner Images</label>
                            <input
                                type="file"
                                name="subcategoryImage"
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                </div>
                <button onClick={saveSubCategory} className='p-3 rounded-lg bg-sky-700 my-5 text-white font-bold hover:bg-black'>Submit</button>
            </form>
          
        </div>
      </div>
    </div>
    </>
  );
}
