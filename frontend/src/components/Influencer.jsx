import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const looks = [
  {
    category: 'STREETWEAR',
    imgSrc: 'https://static.bershka.net/assets/public/a625/6fc3/d4f64705ab3c/28a2b8c70723/kephmarques_c77c5a0e9f0894986f9e/kephmarques_c77c5a0e9f0894986f9e.jpg?ts=1728044441033&t=20241025021705&w=750',
    link: '/influencer1', // Link for the first image
  },
  {
    category: 'CASUAL',
    imgSrc: 'https://static.bershka.net/assets/public/88c1/62f8/534949caa06e/fa67a5c63879/karb______fe8ce3657aa96ac4c29c/karb______fe8ce3657aa96ac4c29c.jpg?ts=1728044442483&t=20241025021705&w=750',
    link: '/influencer2', // Link for the second image
  },
];

function Influencer() {
  const [subcategory, setsubCategory] = useState([]);

  // Fetching subcategory data
  async function getsubCategory() {
    let result = await axios.get('https://actl.co.in/pritam/subcategoryget');
    let final = result.data.filter((data)=> data.subcategoryName == "influencer")
    setsubCategory(final);
  }

  useEffect(() => {
    getsubCategory();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 mb-[150px] ">
      {/* Header section */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">→ GET THE LOOK</h1>
        <p className="text-gray-500 mt-1">
          Find your style in our lookbook and tag @brohh with #brohhlife!
        </p>
      </div>

      {/* Centered grid layout */}
      <div className="flex justify-center mt-16">
  <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-20 gap-y-6"> {/* Adjusted horizontal (gap-x) and vertical (gap-y) gaps */}
    {subcategory.map((data, index) => (
      <div key={index} className="relative w-[300px]">
        <a href={`/view/${data.categoryName}`}>
          <img
            src={`https://actl.co.in/pritam_uploads/${data.subcategoryImage}`}
            alt="product"
            className="w-full h-[350px] object-cover transition-transform transform hover:scale-105 duration-300 rounded-md"
          />
        </a>
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-1 text-sm">
          {data.categoryName}
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}

export default Influencer;
