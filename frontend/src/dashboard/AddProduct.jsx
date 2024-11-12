import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';

const AddProduct = () => {
    let navigation = useNavigate()
    let [loading, setLoading] = useState(false)
    const [imagePreviews, setImagePreviews] = useState([]);
    const [productData, setProductData] = useState({
        type: '',
        productTitle: '',
        productName: '',
        productRating: '',
        productDetail: '',
        productCategory: '',
        productSubCategory: '',
        productPrice: '',
        productDiscount: '',
        productCode: '',
        productSize: [], // Array to store selected sizes
    });

    const [productImages, setProductImages] = useState([]);
    const [category, setCategory] = useState([]);
    const [subcategory, setsubCategory] = useState([]);

    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSizeChange = (e) => {
        const size = e.target.value;
        setProductData((prevData) => {
            const updatedSizes = prevData.productSize.includes(size)
                ? prevData.productSize.filter((item) => item !== size)
                : [...prevData.productSize, size];
            return {
                ...prevData,
                productSize: updatedSizes,
            };
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setProductImages(files);

        // Generate image previews
        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(imagePreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // You can handle form submission and image uploads here.
        const formData = new FormData();
        formData.append('productTitle', productData.productTitle);
        formData.append('type', productData.type);
        formData.append('productName', productData.productName);
        formData.append('productRating', productData.productRating);
        formData.append('productDetail', productData.productDetail);
        formData.append('productCategory', productData.productCategory);
        formData.append('productSubCategory', productData.productSubCategory);
        formData.append('productPrice', productData.productPrice);
        formData.append('productDiscount', productData.productDiscount);
        formData.append('productCode', productData.productCode);
        formData.append('productSize', JSON.stringify(productData.productSize)); // Convert array to JSON string

        productImages.forEach((image) => {
            formData.append('productImages', image);
        });

        try {
            setLoading(true)
            await axios.post('https://actl.co.in/pritam/productSave', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            navigation('/admin/product')
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
            <AdminNav />
            <AdminSidebar />
            <div className="absolute flex flex-col items-center w-[80%] left-[20%] top-20 ">
                <h1 className="text-2xl font-bold mb-4 text-center">Create New Product</h1>
                <form onSubmit={handleSubmit} className='w-full mt-8 pb-10'>
                    <div className='w-full flex justify-center gap-12 mb-8'>
                        <div className='w-[30%] flex flex-col justify-between'>
                            {/* Product Title */}
                            <div className="mb-4">
                                <div className='flex flex-col'>
                                    <label htmlFor="" className='text-2xl font-semibold'>Select Type :-</label>
                                    <select name="type" onChange={handleChange} id="" className='w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' required>
                                        <option>select Type</option>
                                        <option>regular</option>
                                        <option>influencer</option>

                                    </select>
                                    {/* <input type="text" placeholder='Enter category name' className='py-2 px-1 rounded-sm mt-2' onChange={(e)=>setData({...data, subcategoryName: e.target.value})}/> */}
                                </div>
                                <label className="block text-gray-700 font-bold mb-2">Product Title</label>
                                <input
                                    type="text"
                                    name="productTitle"
                                    value={productData.productTitle}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Product Name */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Product Name</label>
                                <input
                                    type="text"
                                    name="productName"
                                    value={productData.productName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Product Rating */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Product Rating</label>
                                <input
                                    type="number"
                                    name="productRating"
                                    value={productData.productRating}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    min="1"
                                    max="5"
                                />
                            </div>

                            {/* Product Detail */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Product Detail</label>
                                <textarea
                                    name="productDetail"
                                    value={productData.productDetail}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                ></textarea>
                            </div>

                            {/* Product Category */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Product Category</label>
                                <select name="productCategory" onChange={handleChange} id="" className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
                                    <option value='dummy'>select category</option>
                                    {subcategory.map((item, index) => (
                                        <option value={item.categoryName} className='uppercase' key={index}>{item.categoryName}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Product productSubCategory */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Product Category With Image</label>
                                <select name="productSubCategory" onChange={handleChange} id="" className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
                                    <option value='dummy' className='text-gray-400'>select Category With Image</option>
                                    {category.map((item, index) => (
                                        <option value={item.categoryName} className='uppercase' key={index}>{item.categoryName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='w-[30%] flex flex-col justify-between'>
                            {/* Product Price */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Product Price</label>
                                <input
                                    type="number"
                                    name="productPrice"
                                    value={productData.productPrice}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Product Discount */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Product Discount in %</label>
                                <input
                                    type="number"
                                    name="productDiscount"
                                    value={productData.productDiscount}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Product Code */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Product Code</label>
                                <input
                                    type="text"
                                    name="productCode"
                                    value={productData.productCode}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Product Size */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Product Size</label>
                                <div className="flex flex-wrap">
                                    <label className="mr-4">
                                        <input
                                            type="checkbox"
                                            value="sm"
                                            checked={productData.productSize.includes('sm')}
                                            onChange={handleSizeChange}
                                            className="mr-2"
                                        />
                                        Small (S)
                                    </label>
                                    <label className="mr-4">
                                        <input
                                            type="checkbox"
                                            value="lg"
                                            checked={productData.productSize.includes('lg')}
                                            onChange={handleSizeChange}
                                            className="mr-2"
                                        />
                                        Large (L)
                                    </label>
                                    <label className="mr-4">
                                        <input
                                            type="checkbox"
                                            value="xl"
                                            checked={productData.productSize.includes('xl')}
                                            onChange={handleSizeChange}
                                            className="mr-2"
                                        />
                                        Extra Large (XL)
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="xxl"
                                            checked={productData.productSize.includes('xxl')}
                                            onChange={handleSizeChange}
                                            className="mr-2"
                                        />
                                        Double XL (XXL)
                                    </label>
                                </div>
                            </div>
                            {/* Image Preview Section */}
                            {imagePreviews.length > 0 && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Image Previews</label>
                                    <div className="flex flex-wrap">
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="mr-4 mb-4">
                                                <img src={preview} alt={`Preview ${index}`} className="w-32 h-32 object-cover rounded-md shadow-md" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Product Images */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Product Images</label>
                                <input
                                    type="file"
                                    name="productImages"
                                    multiple
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
                            {loading ? "Processing" : "Submit Product"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProduct;
