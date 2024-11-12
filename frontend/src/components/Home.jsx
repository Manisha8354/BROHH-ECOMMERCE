import React, { useContext, useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Hero from "./Hero/Hero";
import Products from "./Products/Products";
import TopProducts from "./TopProducts/TopProducts";
import Banner from "./Banner/Banner";
import Subscribe from "./Subscribe/Subscribe";
import Testimonials from "./Testimonials/Testimonials";
import Popup from "./Popup/Popup";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import UserContext from "../context/UserContext";


// about
import Banner1 from "../assets/pritam/bg 7.png";
import { Link } from "react-router-dom";
import Watsapp from "./Watsapp";
import Hero2 from "./Hero/Hero2";
import Bannerhead from "./Hero/Bannerhead";
import Influencer from "./Influencer";


// about us k liye
const BannerImg = {
  backgroundImage: `url(${Banner1})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

export default function Home() {
  const [orderPopup, setOrderPopup] = React.useState(false);
  let [data, setData] = React.useState('')
  let { auth } = useContext(UserContext)

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  // async function getPopup() {
  //   let result = await axios.get('https://actl.co.in/pritam/viewPopup')
  //   setData(result.data[0])
  // }
  // useEffect(() => {
  //   getPopup()
  // }, [auth.username])

  // useEffect(() => {
  //   if (data.status == "on") {
  //     // Show the order popup 3 seconds after the component mounts
  //     const timer = setTimeout(() => {
  //       setOrderPopup(true);
  //     }, 3000);

  //     // Cleanup function to clear the timer
  //     return () => clearTimeout(timer);
  //   }
  // }, [auth.username])
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Hero />
      <Bannerhead />
      <Hero2 />
      <Watsapp />
      <div className="mt-[10px]">
        <TopProducts />
      </div>
      {/* about us */}
      <div className="relative mt-5">
        <Link to="/about" className="block">
          <div
            data-aos="zoom-in"
            className="mb-20 bg-gray-100 dark:bg-gray-800 text-white "
            style={BannerImg}
          >
            <div className="container backdrop-blur-sm py-10">
              <div className="space-y-6 max-w-xl mx-auto">
                <h1 className="text-2xl !text-center sm:text-left sm:text-4xl font-semibold">
                  About Us &gt;
                </h1>
              </div>
            </div>
          </div>
        </Link>
      </div>


      {/* <Products /> */}
      <Influencer />
      <Banner />


      <Subscribe />

      <Testimonials />
     
    </div>
  );
};

