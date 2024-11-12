import React from 'react'

export default function Bannerhead() {
  return (
    <div className="py-12"> {/* Added padding to move content down */}
      <div className="text-center mb-8 flex flex-col justify-center items-center">
          <p data-aos="fade-up" className="text-lg text-black"> {/* Increased text size */}
            ELEVATE YOUR STYLE WITH OUR VERSATILE COLLECTION
          </p>
          <h1 data-aos="fade-up" className="text-5xl font-bold"> {/* Increased text size */}
            Daily deals - Brohh buzz
          </h1>
      </div>
    </div>
  )
}
