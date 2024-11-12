import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function PaymentSuccess() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
      <div className="bg-white text-green-600 rounded-full p-4 shadow-lg animate-bounce">
        <FaCheckCircle size={50} />
      </div>
      <h1 className="mt-6 text-3xl md:text-4xl font-bold text-center animate-fade-in">
        Your Order is Placed Successfully!
      </h1>
      <p className="mt-2 text-lg md:text-xl text-center">
        Thank you for your purchase. We hope you enjoy your order!
      </p>
      <button
        onClick={() => window.location.href = '/'}
        className="mt-8 px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300"
      >
        Continue Shopping
      </button>
    </div>
  );
}
