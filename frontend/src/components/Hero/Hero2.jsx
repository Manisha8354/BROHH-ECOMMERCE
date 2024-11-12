import React, { useEffect, useState } from "react";
import Image1 from "../../assets/hero/banner.png";
import Image2 from "../../assets/hero/banner1.png";
import Image3 from "../../assets/hero/sale.png";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "OUR BESTSELLERS: ",
    description: "UNLEASH YOUR INNER ELEGANCE WITH OUR PRODUCTS THAT ARE HIGH IN DEMAND",
  },
  {
    id: 2,
    img: Image2,
    title: "DISCOVER UNIQUE AND ELEGANT HANDMADE JEWELLERY COLLECTIONS ",
    description: "BY ALANKAR THE ART OF BEADS",
  },
  {
    id: 3,
    img: Image3,
    title: "INDO - WESTERN STATEMENT JEWELLERY",
    description: "GIVING A NEW DEFINITION TO YOUR CONFIDENCE AND BEAUTY ON ALL OCCASIONS OF LIFE",
  },
];

export default function Hero2({ handleOrderPopup }) {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };
  const [data, setData] = useState('');

  async function getProfile() {
    try {
      let result = await axios.get('https://actl.co.in/pritam/getbanner') || '';
      if(result){
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="w-full mx-auto -mt-8"> {/* Added negative top margin to shift banner up */}
      <Slider {...settings}>
        {data && data.map((item) => (
          <Link 
            to="/productsforbanner"  // Navigate to products page within the same app
            key={item.id}
            rel="noopener noreferrer"
          >
            <img
              src={`https://actl.co.in/pritam_uploads/${item.banner}`}
              alt={`Slide ${item.id}`}
              className="w-full h-40 md:h-96 lg:h-96 object-cover"
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
}
