


import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';
// import UserContext from '../context/UserContext';

export default function ViewProduct() {
  let {id} = useParams()
  const [data, setData] = useState([]);
  const [imageIndices, setImageIndices] = useState({});

//   let {adminAuth} = useContext(UserContext)


  async function getpropertylist() {
   
    let result = await axios.get(`https://actl.co.in/pritam/getProduct/${id}`);

    const final = result.data.map(item => {
      if ((typeof item.productImages === 'string') && (typeof item.productSize === 'string')) {
        return { ...item, productImages: JSON.parse(item.productImages),productSize: JSON.parse(item.productSize)  };
      }
     
      return item;
    });
    setData(final);

    // Initialize imageIndices with the first image index (0) for each property
    const indices = final.reduce((acc, item) => {
      acc[item.id] = 0;
      return acc;
    }, {});
    setImageIndices(indices);
  }


  useEffect(() => {
    getpropertylist();
  }, []);

  const prevImage = (id) => {
    setImageIndices(prevIndices => ({
      ...prevIndices,
      [id]: prevIndices[id] === 0 ? data.find(item => item.id === id).productImages.length - 1 : prevIndices[id] - 1,
    }));
  };

  const nextImage = (id) => {
    setImageIndices(prevIndices => ({
      ...prevIndices,
      [id]: prevIndices[id] === data.find(item => item.id === id).productImages.length - 1 ? 0 : prevIndices[id] + 1,
    }));
  };

  useEffect(() => {
    const intervals = data.map(property => {
      return setInterval(() => {
        setImageIndices(prevIndices => ({
          ...prevIndices,
          [property.id]: prevIndices[property.id] === property.productImages.length - 1 ? 0 : prevIndices[property.id] + 1,
        }));
      }, 3000);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, [data]);

//   console.log(data)


  return (
    <>
      <AdminNav/>
      <AdminSidebar/>
        <div className='absolute flex justify-center top-20 items-center w-[80%] left-[20%]'>
          <div className="w-3/4 rounded shadow-lg">

          <div className='relative w-full h-[350px]'>
            {data.map((data, index) => {
              // const { id, image, category, location, name, price, type } = val;
              const currentImageIndex = imageIndices[id] || 0;
              return (
                <div className='box shadow' key={index}>
                  <div className=' relative w-full h-[500px]'>
                    <img
                      src={`https://actl.co.in/pritam_uploads/${data.productImages[currentImageIndex]}`}
                      alt={`productImages ${currentImageIndex + 1}`}
                      // className={`carousel-image ${currentImageIndex === index ? 'active' : ''} w-full h-full object-cover absolute top-0 left-0`}
                      className={`carousel-image w-full h-full object-cover absolute top-0 left-0`}
                      style={{ transition: 'opacity 1s ease-in-out' }}
                    />
                    <button
                      onClick={() => prevImage(data.id)}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                    >
                      &lt;
                    </button>
                    <button
                      onClick={() => nextImage(data.id)}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                    >
                      &gt;
                    </button>
                  </div>
                  <div className="px-6 py-4 space-y-5">
                  <div>
                  <span className="font-bold text-2xl text-gray-700 capitalize">Product Code :- </span>
                  <span className="text-gray-600 text-xl">{data.productCode}</span>
                  </div>
                  <div>
                  <span className="font-bold text-2xl text-gray-700 capitalize">Product Title :- </span>
                  <span className="text-gray-600 text-xl">{data.productTitle}</span>
                  </div>
                  <div>
                  <span className="font-bold text-2xl text-gray-700 capitalize">Product Name :- </span>
                  <span className="text-gray-600 text-xl">{data.productName}</span>
                  </div>
                  <div>
                  <span className="font-bold text-2xl text-gray-700 capitalize">Product Rating :- </span>
                  <span className="text-gray-600 text-xl">{data.productRating}</span>
                  </div>
                  <div>
                  <span className="font-bold text-2xl text-gray-700 capitalize">Product Details :- </span>
                  <span className="text-gray-600 text-xl">{data.productDetail}</span>
                  </div>
                  <div>
                  <span className="font-bold text-2xl text-gray-700 capitalize">Product Category :- </span>
                  <span className="text-gray-600 text-xl">{data.productCategory}</span>
                  </div>
                  <div>
                  <span className="font-bold text-2xl text-gray-700 capitalize">Product Sub-Category :- </span>
                  <span className="text-gray-600 text-xl">{data.productSubCategory}</span>
                  </div>
                  <div>
                  <span className="font-bold text-2xl text-gray-700 capitalize">Product Price :- </span>
                  <span className="text-gray-600 text-xl">{data.productPrice}</span>
                  </div>
                  <div>
                  <span className="font-bold text-2xl text-gray-700 capitalize">Product Discount :- </span>
                  <span className="text-gray-600 text-xl">{data.productDiscount}</span>
                  </div>
                  <div className='flex'>
                  <span className="font-bold text-2xl text-gray-700 capitalize">Product Size :- </span>
                <div className='flex'>
                {data.productSize.map((item)=>(
                  <div className="text-gray-600 text-xl px-2 bg-orange-200 rounded-xl border-2 border-orange-400 mr-3">{item}</div>
                  ))}
                </div>
                  </div>
      
                </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}