import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';

const AddBanner = () => {
    let navigation = useNavigate()
    let [loading, setLoading] = useState(false)
    const [imagePreviews, setImagePreviews] = useState([]);
    const [productData, setProductData] = useState({
        productCategory: '',
        productSubCategory: '',
    });

    const [productImages, setProductImages] = useState(null);
    const [category, setCategory] = useState([]);
    const [subcategory, setsubCategory] = useState([]);

    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });

    };

    const handleImageChange = (e) => {
        setProductImages(e.target.files[0]);

        // Generate image previews
        const imagePreviews =  URL.createObjectURL(e.target.files[0]);
        setImagePreviews(imagePreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // You can handle form submission and image uploads here.
        const formData = new FormData();
        // formData.append('productCategory', productData.productCategory);
        // formData.append('productSubCategory', productData.productSubCategory);
        formData.append('banner', productImages);

        try {
            setLoading(true)
            await axios.post('https://actl.co.in/pritam/bannerSave', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            navigation('/admin/banner')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    };

    async function getCategory() {
        let result = await axios.get('https://actl.co.in/pritam/categoryget')
        setCategory(result.data)
        // console.log(result)
    }
    async function getsubCategory() {
        let result = await axios.get('https://actl.co.in/pritam/subcategoryget')
        setsubCategory(result.data)
        // console.log(result)
    }
    useEffect(() => {
        getCategory()
        getsubCategory()
    }, [])
    // console.log(category)
    return (
      <>
      <AdminNav/>
      <AdminSidebar/>
      <div className="absolute flex flex-col items-center w-[80%] left-[20%] top-20 ">
            <h1 className="text-2xl font-bold mb-4 text-center">Upload New Banner</h1>
            <form onSubmit={handleSubmit} className='w-full mt-8 pb-10'>
                <div className='w-full flex justify-center gap-12 mb-8'>
                    {/* <div className='w-[30%] flex flex-col justify-between'>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Product Category</label>
                            <select name="productCategory" onChange={handleChange} id="" className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
                                <option value='dummy'>select category</option>
                                {category.map((item, index) => (
                                    <option value={item.categoryName} className='uppercase' key={index}>{item.categoryName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Product Full Category Name</label>
                            <select name="productSubCategory" onChange={handleChange} id="" className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
                                <option value='dummy' className='text-gray-400'>Select Product Full Category Name</option>
                                {subcategory.map((item, index) => (
                                    <option value={item.subcategoryName} className='uppercase' key={index}>{item.subcategoryName}</option>
                                ))}
                            </select>
                        </div>
                    </div> */}
                    <div className='w-[30%] flex flex-col justify-between'>
                        {/* Product Price */}
                        
                        {/* Image Preview Section */}
                        {imagePreviews.length > 0 && (
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Image Previews</label>
                                <div className="flex flex-wrap">
                                    {/* {imagePreviews.map((preview, index) => ( */}
                                        <div className="mr-4 mb-4">
                                            <img src={imagePreviews} alt={`Preview`} className="w-96 h-32 object-cover rounded-md shadow-md" />
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
                                name="banner"
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                    </div>
                </div>
                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        {loading ? "Processing" : "Upload Banner"}
                    </button>
                </div>
            </form>
        </div>
      </>
    );
};

export default AddBanner;
