import React from "react";
import Slider from "react-slick";
import img from "../../assets/testimonial10.jpeg"
import img1 from "../../assets/testimonial11.webp"
import img2 from "../../assets/testimonial12.jpeg"
import img3 from "../../assets/pritam/testimonial.jpeg"
const TestimonialData = [
  {
    id: 1,
    name: "Albert",
    text: " I've been shopping here for a while now, and I must say, the collection is always up-to-date with the latest trends. Whether it's formal wear or casual outfits, they’ve got it all! .",
    img: img,
  },
  {
    id: 2,
    name: "Anna",
    text: "Shopping for women’s clothing can be overwhelming, but this site makes it so easy! I love the variety, from chic dresses to comfy casuals. The quality is amazing, and I always feel like I'm wearing something unique.",
    img: img1,
  },
  {
    id: 3,
    name: "ALice",
    text: "This is the one-stop shop for both men’s and women’s fashion! The user-friendly interface and stylish designs keep me coming back. My wife loves the women’s collection just as much as I do the men’s section.",
    img: img2,
  },
  {
    id: 5,
    name: "Lina",
    text: "AIt’s hard to find a store that caters so well to both men's and women's fashion, but this one hits the mark! I’ve found everything from comfortable athleisure to elegant evening wear. Always a great experience. ",
    img: img3,
  },
];

export default function Testimonials() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10">
      <div className="container">
        {/* header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-black">
            What our customers are saying
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Testimonials
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            WITH OUR INOVATIVE DESIGNS, CREATIVITY AND QUALITY, WE HAVE WON THE TRUST AMONG OUR CUSTOMERS
          </p>
        </div>

        {/* Testimonial cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div className="my-6">
                <div
                  key={data.id}
                  className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-gray-300 relative"
                >
                  <div className="mb-4">
                   <img
  src={data.img}
  alt={data.name}
  className="rounded-full w-20 h-20 max-w-[80px] max-h-[80px] object-cover"
/>

                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500">{data.text}</p>
                      <h1 className="text-xl font-bold text-black/80 dark:text-light">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                    ,,
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};


