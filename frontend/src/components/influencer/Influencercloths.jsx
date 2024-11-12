import React from 'react';

const products = [
  {
    id: 1,
    name: "Contrast boxy fit shirt with pocket",
    price: "35.99 €",
    image: "https://static.bershka.net/assets/public/08e3/b55c/97de474b8fd2/ddc61212061f/06429703406-a4o/06429703406-a4o.jpg?ts=1728483507974&w=450", // Replace with actual image link
  },
  {
    id: 2,
    name: "Ribbed vest top",
    price: "9.99 €",
    image: "https://static.bershka.net/4/photos2/2024/V/0/2/p/2841/154/250/2841154250_2_4_0.jpg?imwidth=450&ts=1706717323152", // Replace with actual image link
  },
  {
    id: 3,
    name: "Relaxed fit jeans",
    price: "29.99 €",
    image: "https://static.bershka.net/assets/public/13f8/372f/065c42e68c11/659a6cb12b22/05341335401-a4o/05341335401-a4o.jpg?ts=1718032826107&w=450", // Replace with actual image link
  },
];

export default function Influencercloths() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-6 p-5">
      {/* Left Side Image */}
      <div className="flex-1">
        <img
          src="https://static.pxlecdn.com/photos/697865769/xl/440a1a454b0b0a37dd22.jpg" // Replace with actual person image link
          alt="Person"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side Product List */}
      <div className="flex-1 md:ml-10">
        <h2 className="text-2xl font-semibold mb-4">#BROHH</h2>
        <h3 className="text-xl font-medium mb-4">Get the look</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-700 font-semibold">{product.name}</p>
                  <p className="text-gray-500">{product.price}</p>
                </div>
                <button className="text-gray-400 hover:text-red-500">
                  ♥ {/* Icon for wishlist; you can replace it with a heart icon */}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
