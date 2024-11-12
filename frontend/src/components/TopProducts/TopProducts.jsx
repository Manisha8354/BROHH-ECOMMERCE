import React, { useEffect, useState } from "react";
import Img1 from "../../assets/shirt/myfot2.jfif";
import Img2 from "../../assets/shirt/myfoto.jfif";
import Img3 from "../../assets/shirt/myfoto2.jfif";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Necklace Sets",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: Img2,
    title: "Earrings",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: Img3,
    title: "Bracelets",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function TopProducts({ handleOrderPopup }) {
  const [subcategory, setsubCategory] = useState([]);

  // Fetching subcategory data
  async function getsubCategory() {
    let result = await axios.get('https://actl.co.in/pritam/subcategoryget');
    let final = result.data.filter((data)=> data.subcategoryName == "regular")
    setsubCategory(final);
  }

  useEffect(() => {
    getsubCategory();
  }, []);
// console.log(subcategory)
  return (
    <div className="h-fit">
      <div className="container mx-auto h-fit flex flex-col justify-start items-center pt-5">
        {/* Header section */}
        <div className="text-center mb-8 flex flex-col justify-center items-center">
          <p data-aos="fade-up" className="text-sm text-black">
            ELEVATE YOUR STYLE WITH OUR VERSATILE COLLECTION
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Shop via Category
          </h1>
        </div>

        {/* Body section with grid layout */}
        <div className="flex flex-wrap gap-28 mt-24 justify-center"> {/* Added mt-10 to shift the cards down */}
          {subcategory.map((data, index) => (
            <div
              
              className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group w-[300px]"
              key={data.id}
            >
              {/* image section */}
              <div className="h-[150px] flex justify-center">
                <img
                  src={`https://actl.co.in/pritam_uploads/${data.subcategoryImage}`}
                  alt="product"
                  className={`block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md rounded-md w-[120px] h-[150px]`}
                />
              </div>

              {/* details section */}
              <div className="p-4 text-center flex flex-col gap-1">
                {/* star rating */}
                <div className="w-full flex items-center justify-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{data.categoryName}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                  {data.description}
                </p>

              
                <a
                  href={`/view/${data.categoryName}`}
                  className="bg-gray-500 hover:scale-105 duration-300 text-white py-1 px-4 rounded-full group-hover:bg-white group-hover:text-black"
                  onClick={handleOrderPopup}
                >
                  Order Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
