import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Productbannerlinkpage() {
  const [data, setData] = useState([]);
  let { auth } = useContext(UserContext);
  let navigation = useNavigate();

  async function getProfile() {
    try {
      let result = await axios.get('https://actl.co.in/pritam/getProduct');
      if (result) {
        const final = result.data.map(item => {
          if (typeof item.productImages === 'string' && typeof item.productSize === 'string') {
            return { ...item, productImages: JSON.parse(item.productImages), productSize: JSON.parse(item.productSize) };
          }
          return item;
        });
        setData(final);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  async function addCart(product) {
    if (auth.username) {
      let cartData = { ...product, productImages: `https://actl.co.in/pritam_uploads/${product.productImages[0]}` };
      let user = auth.username.email.split('@')[0] + '_pritam_cart';
      await axios.post(`https://actl.co.in/pritam/cartSave/${user}`, cartData);
      navigation('/cart');
    } else {
      navigation('/signinsignup');
    }
  }

  async function addWish(product) {
    if (auth.username) {
      let wishData = { ...product, productImages: `https://actl.co.in/pritam_uploads/${product.productImages[0]}` };
      let user = auth.username.email.split('@')[0] + '_pritam_wish';
      await axios.post(`https://actl.co.in/pritam/wishSave/${user}`, wishData);
      navigation('/wishlist');
    } else {
      navigation('/signinsignup');
    }
  }

  return (
    <div className="relative bottom-0 mt-10 px-4 md:px-8 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-black">
            Our Popular Products
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Adorn Yourself with Our Exclusive Range Of Handmade Jewelry
          </p>
        </div>

        {/* Product Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data && data.map((product, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
              <Link to={`/productpage/${product.productCode}`}>
                <img
                  src={`https://actl.co.in/pritam_uploads/${product.productImages[0]}`}
                  alt="Product Image"
                  className="w-full h-64 md:h-72 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mt-2">{product.productTitle}</h2>
                  <p className="text-red-500 font-bold">
                    {Math.ceil(product.productPrice - ((product.productPrice * product.productDiscount) / 100))} Rs.
                  </p>
                  <p className="line-through text-gray-400">{product.productPrice} Rs.</p>
                </div>
              </Link>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-4">
                <button 
                  onClick={() => addCart(product)} 
                  className="bg-gray-900 hover:bg-gray-600 text-white py-2 px-4 text-sm rounded-lg w-full md:w-auto transition-colors"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => addWish(product)} 
                  className="bg-red-900 hover:bg-red-700 text-white py-2 px-4 text-sm rounded-lg w-full md:w-auto transition-colors"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
