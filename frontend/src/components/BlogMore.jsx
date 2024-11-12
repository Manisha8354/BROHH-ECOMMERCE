import React from 'react'
import img4 from "../assets/pritam/24.png"
import img3 from "../assets/pritam/1.png"
import img2 from "../assets/pritam/2.png"
import img1 from "../assets/pritam/14.png"

export default function BlogMore() {
  return (
    <div className=''>
      {/* 1st Section - Men's Clothing */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-start">
            {/* Text Section */}
            <div className="md:w-1/2">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Discover the Latest in Men's Fashion - Trendy and Comfortable Styles for Every Occasion.
              </h1>
              <p className="text-gray-700 leading-relaxed">
                Elevate your wardrobe with our curated collection of men's clothing. From casual wear to formal attire, our selection is designed for style and comfort. Whether you're looking for classic shirts, trendy t-shirts, or tailored suits, we offer the best in men's fashion, crafted with high-quality materials and impeccable attention to detail.
              </p>
            </div>
            {/* Image Section */}
            <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
              <img
                src={img2}
                alt="Men's Fashion"
                className="w-full h-[300px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2nd Section - Women's Clothing */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-start">
            {/* Text Section */}
            <div className="md:w-1/2">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Explore Elegant and Chic Women's Fashion - Designed to Make You Shine.
              </h1>
              <p className="text-gray-700 leading-relaxed">
                Discover the perfect blend of elegance and comfort with our women's fashion collection. From everyday casual outfits to glamorous evening wear, our range includes dresses, tops, skirts, and more. Whether you're dressing for a special occasion or updating your daily wardrobe, our clothing offers the latest in fashion trends for every woman.
              </p>
            </div>
            {/* Image Section */}
            <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
              <img
                src={img4}
                alt="Women's Fashion"
                className="w-full h-[300px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3rd Section - Men's Casual Wear */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-start">
            {/* Text Section */}
            <div className="md:w-1/2">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Upgrade Your Casual Wardrobe with Stylish Men's Wear.
              </h1>
              <p className="text-gray-700 leading-relaxed">
                Stay on trend with our collection of casual wear for men. Featuring a wide range of t-shirts, jeans, joggers, and hoodies, our casual pieces combine comfort with the latest fashion trends. Perfect for everyday wear or relaxed weekend outings, these outfits are designed to make you look good without compromising on comfort.
              </p>
            </div>
            {/* Image Section */}
            <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
              <img
                src={img1}
                alt="Men's Casual Wear"
                className="w-full h-[300px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4th Section - Women's Formal Wear */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-start">
            {/* Text Section */}
            <div className="md:w-1/2">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Dress to Impress with Women's Formal Wear for Every Occasion.
              </h1>
              <p className="text-gray-700 leading-relaxed">
                Make a statement with our range of women's formal wear, featuring elegant dresses, blouses, and trousers. Ideal for work, formal events, or an evening out, these pieces are designed with sophistication and style in mind. Stand out in classic silhouettes and bold designs that showcase your unique sense of fashion.
              </p>
            </div>
            {/* Image Section */}
            <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
              <img
                src={img3}
                alt="Women's Formal Wear"
                className="w-full h-[300px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
