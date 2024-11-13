import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Shipping() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      <div className="bg-gray-200 min-h-screen py-10 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center animate-fade-in">
            SHIPPING POLICY
          </h1>

          <h2 className="text-xl font-semibold mb-4 text-gray-800 animate-fade-in-up">ETA: ESTIMATED TIME OF ARRIVAL:</h2>
          <p className="text-gray-700 mb-4 transition-all duration-300 hover:text-gray-900">
            Estimated delivery time for all orders is between 3 to 7 working days from the date of order placement.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-gray-800 animate-fade-in-up">
            DOMESTIC / LOCAL SHIPPING WITHIN INDIA:
          </h2>
          <p className="text-gray-700 mb-4 transition-all duration-300 hover:text-gray-900">
            At **Brohh Clothing**, we understand the excitement of receiving your new men's and women's fashion items quickly. We strive to process and ship all orders within one business day for timely delivery.
          </p>

          <ul className="list-disc list-inside text-gray-700 mb-4 transition-all duration-300 hover:text-gray-900">
            <li>All prepaid orders come with free shipping.</li>
            
            <li>Orders are processed and shipped on the next business day.</li>
            <li>There will be additional shipping charges depending on delievery location</li>
            <li>We ship using reliable and trusted courier services to ensure timely delivery.</li>
            <li>Once an order has been shipped, we no longer have control over the delivery process, but you can reach out to us for any inquiries.</li>
            <li>All orders come with tracking numbers so you can monitor your shipment's progress.</li>
            <li>Shipping times may vary based on your location, distance from our warehouse, and the courier service used. Please place your orders early to avoid delays during festive seasons or high demand periods.</li>
            <li>If your location is not covered by private courier services, we will ship your order via India Post.</li>
          </ul>

          <p className="text-gray-700 mt-6 transition-all duration-300 hover:text-gray-900">
            For more information or questions about your order's shipment, feel free to contact us at <a href="mailto:brohhclothing@gmail.com" className="text-blue-500 underline hover:text-blue-700">info@brohh.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
