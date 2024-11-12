import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import UserContextProvider from '../context/UserContextProvider';
const NavbarFilter = () => {
  let { categoryName } = useParams();
  const [data, setData] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [alldata, setAllData] = useState('');
  const [star, setStar] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // For large view of the image
  const [mainImage, setMainImage] = useState(''); // For the main image display
  const [isModalOpen, setIsModalOpen] = useState(false); // To control the modal visibility

  async function getProfile() {
    try {
      let result = await axios.get(`https://actl.co.in/pritam/getProduct`);
      if (result) {
        let x = '';
        for (let i = 1; i <= result.data[0].productRating; i++) {
          x += '⭐';
        }
        setStar(x);
        const final = result.data.map(item => {
          if ((typeof item.productImages === 'string') && (typeof item.productSize === 'string')) {
            return { ...item, productImages: JSON.parse(item.productImages), productSize: JSON.parse(item.productSize) };
          }
          return item;
        })
        let responce = final.filter((item)=>{
           return (item.productCategory == categoryName)
        })
        console.log(responce)
        setData(responce);
        setSelectedCategory("All")
        setMainImage(`https://actl.co.in/${final[0].productImages[0]}`); // Set the main image initially
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getProfile();
  }, [categoryName]);

  async function getFilterProfile(subcategory) {
    try {
      let result = await axios.get(`https://actl.co.in/pritam/getProduct`);
      if (result) {
        let x = '';
        for (let i = 1; i <= result.data[0].productRating; i++) {
          x += '⭐';
        }
        setStar(x);
        const final = result.data.map(item => {
          if ((typeof item.productImages === 'string') && (typeof item.productSize === 'string')) {
            return { ...item, productImages: JSON.parse(item.productImages), productSize: JSON.parse(item.productSize) };
          }
          return item;
        })
        let responce = final.filter((item)=>{
           return (item.productSubCategory == subcategory)
        })
        setData(responce);
        setSelectedCategory(subcategory)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl); // Set the clicked thumbnail as the main image
  };


  async function getAllProfile() {
    try {
      let result = await axios.get('https://actl.co.in/pritam/categoryget');
      let final = result.data.filter((data)=> data.categoryType  == categoryName)
      setAllData(final)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    getAllProfile();
  }, [categoryName]);
  

  return (
    <div className="container mx-auto p-4">
      {/* Main product page wrapper */}
 

      {/* Additional Information Section */}
      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">All {categoryName} Products</h2>
        <div className="flex space-x-4 justify-center mb-6">
        <button
            onClick={getProfile}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory == "All"
                ? 'bg-black text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            All
          </button>
        {alldata && alldata.map((category) => (
          <button
            onClick={() => getFilterProfile(category.categoryName)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category.categoryName
                ? 'bg-black text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {category.categoryName}
          </button>
        ))}
      </div>
      <div className='flex gap-8 flex-wrap'>
      {data && data.map((product) => (
          <Link key={product.id} className="border w-[300px] p-4 rounded-lg" to={`/productpage/${product.productCode}`}>
            <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        loop={true}
      >
         <style>
    {`
      .swiper-button-next, .swiper-button-prev {
        color: gray; /* Your desired color */
      }
      .swiper-button-next::after, .swiper-button-prev::after {
        font-size: 20px; /* Optional: Adjust the arrow size */
      }
    `}
  </style>
        {product.productImages.map(slide => (
          <SwiperSlide key={slide.id}>
            <img
              src={`https://actl.co.in/pritam_uploads/${slide}`}
              alt={`Slide ${slide.id}`}
              className="w-full h-72 object-fit "
            />
          </SwiperSlide>
        ))}
      </Swiper>
            <h2 className="text-lg font-semibold">{product.productTitle}</h2>
            <p className="text-red-500">{Math.ceil(product.productPrice -((product.productPrice * product.productDiscount)/100))} Rs.</p>
            <p className="line-through text-gray-400">{product.productPrice} Rs.</p>
          </Link>
        ))}
      </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div className="relative">
            <img src={selectedImage} alt="Large view" className="max-w-full max-h-screen" />
            <button
              className="absolute top-4 right-4 text-white text-xl font-bold"
              onClick={closeModal}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarFilter;
