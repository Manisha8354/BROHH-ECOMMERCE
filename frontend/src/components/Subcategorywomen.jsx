import React from 'react';
import { Link } from 'react-router-dom';
import tshirt from '../assets/pritam/twomen.png';

const Subcategorywomen = () => {
  return (
    <div className="mt-[50px] px-4">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">All Men's Products</h1>
        <p className="text-gray-500">Explore our exclusive collection of T-shirts</p>
      </div>

      {/* Centered T-Shirt Categories */}
      <div className="flex justify-center"> {/* Center items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {/* T-Shirt Link */}
          <Link 
            to="/28inch" 
            className="relative flex flex-col items-center justify-center p-8 border rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <img src={tshirt} alt="T-Shirts" className="w-40 h-40" />
            <button className="mt-4 text-2xl font-semibold">T-Shirts</button>
          </Link>

          {/* Add more items as needed */}
        </div>
      </div>
    </div>
  );
};

export default Subcategorywomen;
