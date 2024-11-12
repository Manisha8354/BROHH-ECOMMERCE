import React, { useState, useEffect } from "react";
import BannerImg1 from "../../assets/pritam/blogs.webp";
import BannerImg2 from "../../assets/pritam/blogwomen.webp";
import BannerImg3 from "../../assets/pritam/contact pritam2.avif";
import BannerImg4 from "../../assets/pritam/contactpritam.jpeg";
import { Link } from "react-router-dom";

export default function Banner() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      id: 1,
      image: BannerImg1,
      data: "Men's Collection",
      content: {
        title: "Stylish Men's Shoes for Every Occasion",
        description: "Explore our wide range of men’s shoes, offering comfort, style, and durability for every occasion. From casual wear to formal events, find your perfect fit.",
        link: "/products/mens-shoes",
      },
    },
    {
      id: 2,
      image: BannerImg2,
      data: "Women's Collection",
      content: {
        title: "Elegant Women's Dresses for Every Season",
        description: "Discover our collection of women’s dresses, designed to bring elegance to any occasion. Whether it’s a casual outing or a special event, find your perfect style.",
        link: "/products/womens-dresses",
      },
    },
    {
      id: 3,
      image: BannerImg3,
      data: "Men's Accessories",
      content: {
        title: "Premium women's Watches for a Timeless Look",
        description: "Accessorize with our collection of premium men’s watches, perfect for adding a touch of sophistication to any outfit. Find the right piece for you.",
        link: "/products/mens-watches",
      },
    },
    {
      id: 4,
      image: BannerImg4,
      data: "Women's Accessories",
      content: {
        title: "Exclusive Women's Handbags for Every Occasion",
        description: "Shop our selection of women’s handbags that combine style and functionality. Perfect for both everyday use and special occasions.",
        link: "/products/womens-handbags",
      },
    },
  ];

  const getVisibleCards = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  useEffect(() => {
    const handleResize = () => setVisibleCards(getVisibleCards());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % (cards.length - visibleCards + 1)
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [visibleCards, cards.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative ">
    <div className="min-h-[550px] flex flex-col justify-center items-center py-12 sm:py-0">
      {/* Blogs Heading */}
      <h1 className="text-4xl font-bold mb-8">Blogs</h1>

      <div className="w-full md:w-3/5 mb-8 md:mb-0 overflow-hidden py-3 mt-12">
        {/* Sliding cards */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`relative w-full h-[450px] lg:h-[500px] rounded-lg shadow-lg overflow-hidden flex-shrink-0 transform hover:scale-105 transition-transform duration-300 ease-in-out ${index !== cards.length - 1 ? 'mr-4' : ''}`}
              style={{ flex: `0 0 ${100 / visibleCards}%` }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Link wraps the whole card */}
              <Link to="/blogmore" className="block w-full h-full">
                <img src={card.image} alt={`Card ${card.id}`} className="w-full h-full object-cover" />

                {/* Overlay content */}
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white p-4 text-center z-10 fade-in">
                  <h2 className="text-2xl font-semibold">{card.content.title}</h2>
                  <p className="mt-2 text-sm">{card.content.description}</p>
                </div>

                {/* Data shown when hovered */}
                {hoveredCard === card.id && (
                  <div className="absolute inset-0 bg-black/60 flex items-end justify-center text-white p-4 text-center z-10 fade-in">
                    {card.data}
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>

        {/* Dots for Navigation */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: Math.max(cards.length - visibleCards + 1, 1) }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-3 w-3 rounded-full transition-colors duration-300 ease-in-out ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
