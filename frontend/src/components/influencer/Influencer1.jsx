import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = ['All', 'Streetwear', 'Trendy', 'Casual', 'Basic'];

const imageData = [
  { id: 1, src: 'https://static.pxlecdn.com/photos/693927870/xl/6389e9399541e4c211c8.jpg', category: 'Trendy' },
  { id: 2, src: 'https://static.pxlecdn.com/photos/698646483/xl/9d9d9084f86052a26101.jpg', category: 'Trendy' },
  { id: 3, src: 'https://static.pxlecdn.com/photos/698609712/xl/8bd966ba01787bcfca91.jpg', category: 'Trendy' },
];

export default function Influencer1() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredImages =
    selectedCategory === 'All'
      ? imageData
      : imageData.filter((image) => image.category === selectedCategory);

  return (
    <div className="p-5">
      {/* Category Filter Buttons */}
      <div className="flex space-x-4 justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category
                ? 'bg-black text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <div key={image.id} className="relative group overflow-hidden">
            <Link to="/influencercloths">
              <img
                src={image.src}
                alt={`Image ${image.id}`}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm">Go to See Products</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
