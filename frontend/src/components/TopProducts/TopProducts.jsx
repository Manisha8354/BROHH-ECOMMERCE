import React, { useEffect, useState } from "react";
import Img1 from "../../assets/shirt/myfot2.jfif";
import Img2 from "../../assets/shirt/myfoto.jfif";
import Img3 from "../../assets/shirt/myfoto2.jfif";
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
    let result = await axios.get("https://actl.co.in/pritam/subcategoryget");
    let final = result.data.filter(
      (data) => data.subcategoryName === "regular"
    );
    setsubCategory(final);
  }

  useEffect(() => {
    getsubCategory();
  }, []);

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
        <div className="flex flex-wrap gap-10 justify-center">
          {subcategory.map((data, index) => (
            <div
              className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-2xl group w-full sm:w-[320px] md:w-[280px] lg:w-[320px] xl:w-[320px] h-[320px] flex justify-center items-center hover:shadow-3xl transition-shadow duration-300"
              key={data.id}
            >
              {/* Image section */}
              <div
                className="w-full h-full cursor-pointer"
                onClick={() => (window.location.href = `/view/${data.categoryName}`)}
              >
                <img
                  src={`https://actl.co.in/pritam_uploads/${data.subcategoryImage}`}
                  alt="product"
                  className="w-full h-full object-cover rounded-2xl transform scale-105 group-hover:scale-110 duration-300"
                />
              </div>

              {/* Details section */}
              <div className="absolute -top-4 -left-5 p-4 text-left">
                <h1 className="text-3xl font-bold">{data.categoryName}</h1>
                <p className="text-gray-500 duration-300 text-sm line-clamp-2">
                  {data.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
