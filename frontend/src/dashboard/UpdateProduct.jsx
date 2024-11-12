import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';

const UpdateProduct = () => {
    const { id } = useParams(); // Assuming the product ID is in the URL
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const [subcategory, setsubCategory] = useState([]);
    const [productData, setProductData] = useState({
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
    const [existingImages, setExistingImages] = useState([]); // To store existing images

    // Fetch product details when component loads
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://actl.co.in/pritam/getProduct/${id}`);
                const product = response.data[0];

                // Populate form with product data
                setProductData({
                    productTitle: product.productTitle,
                    productName: product.productName,
                    productRating: product.productRating,
                    productDetail: product.productDetail,
                    productCategory: product.productCategory,
                    productSubCategory: product.productSubCategory,
                    productPrice: product.productPrice,
                    productDiscount: product.productDiscount,
                    productCode: product.productCode,
                    productSize: JSON.parse(product.productSize), // Convert JSON string to array
                });

                // Set existing images for preview
                setExistingImages(JSON.parse(product.productImages));
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductDetails();
    }, [id]);

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
        setProductImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // You can handle form submission and image pritam_uploads here.
        const formData = new FormData();
        formData.append('productTitle', productData.productTitle);
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
console.log(productData)
        try {
            await axios.put(`https://actl.co.in/pritam/updateProduct/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Navigate to product list after update
            navigate('/admin/product');
        } catch (error) {
            console.log(error);
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
    return (
        <>
        <AdminNav/>
        <AdminSidebar/>
        <div className="absolute flex flex-col items-center w-[80%] left-[20%] top-20">
            <h1 className="text-2xl font-bold mb-4 text-center">Update Product</h1>
            <form onSubmit={handleSubmit}>
                {/* Product Title */}
                <div className="mb-4">
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
                {/* Product Category */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Product Category</label>
                    <select
                        name="productCategory"
                        value={productData.productCategory} // Set the selected value from productData
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="dummy" disabled>
                            Select Category
                        </option>
                        {category.map((item, index) => (
                            <option value={item.categoryName} key={index}>
                                {item.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Product Sub-Category */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Product Sub-Category</label>
                    <select
                        name="productSubCategory"
                        value={productData.productSubCategory} // Set the selected value from productData
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="dummy" disabled>
                            Select Sub-Category
                        </option>
                        {subcategory.map((item, index) => (
                            <option value={item.subcategoryName} key={index}>
                                {item.subcategoryName}
                            </option>
                        ))}
                    </select>
                </div>

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
                    <label className="block text-gray-700 font-bold mb-2">Product Discount</label>
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

                {/* Existing Product Images Preview */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Current Images</label>
                    <div className="flex">
                        {existingImages.map((image, index) => (
                            <img
                                key={index}
                                src={`https://actl.co.in/pritam_uploads/${image}`} // Assuming your images are stored in a public folder
                                alt="product"
                                className="w-20 h-20 object-cover mr-4"
                            />
                        ))}
                    </div>
                </div>

                {/* New Product Images */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Upload New Images (Will replace existing)</label>
                    <input
                        type="file"
                        name="productImages"
                        multiple
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
        </>
    );
};

export default UpdateProduct;
