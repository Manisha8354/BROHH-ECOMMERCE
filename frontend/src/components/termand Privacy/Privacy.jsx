import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Privacy() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

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
    <>
      <div className="bg-gray-300 min-h-screen py-10 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center animate-fade-in hover:text-blue-500 transition-all duration-300">
            Privacy Policy
          </h1>

          <p className="text-gray-800 mb-4 animate-fade-in-up transition-all duration-300 hover:text-gray-900 hover:scale-105">
            This Privacy Policy governs the manner in which **Brohh Clothes** collects, uses, maintains, and discloses information collected from users of the www.[yourwebsite].com website ("Site"). This Privacy Policy applies to this website, official social media pages/handles/channels, and all products offered by Brohh Clothes, including men and women category clothing.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800 animate-fade-in-up hover:text-blue-500 transition-all duration-300">
            Personal Identification Information
          </h2>
          <p className="text-gray-700 mb-4 transition-all duration-300 hover:text-gray-900 hover:scale-105">
            We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, submit style preferences for men or women category clothing, submit feedback forms, write reviews and testimonials, place an order, subscribe to the newsletter, log in using personal social media credentials, respond to a survey, and in connection with other activities, products, features, or resources we make available on our Site.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800 animate-fade-in-up hover:text-blue-500 transition-all duration-300">
            Non-personal Identification Information
          </h2>
          <p className="text-gray-700 mb-4 transition-all duration-300 hover:text-gray-900 hover:scale-105">
            We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer, and technical information about Users' means of connection to our Site, such as the operating system, the Internet service providers utilized, and other similar information. This helps us better understand user preferences, especially those related to the men and women clothing categories.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800 animate-fade-in-up hover:text-blue-500 transition-all duration-300">
            How We Use Collected Information
          </h2>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2 transition-all duration-300 hover:text-gray-900">
            <li className="hover:scale-105 hover:text-blue-500">To improve customer service, including faster responses to queries about men and women clothing.</li>
            <li className="hover:scale-105 hover:text-blue-500">To personalize user experience and offer tailored recommendations in the men and women clothing sections.</li>
            <li className="hover:scale-105 hover:text-blue-500">To enhance the functionality of our Site, including product listings for both men and women clothing.</li>
            <li className="hover:scale-105 hover:text-blue-500">To process payments and manage transactions related to purchases from the men and women product categories.</li>
            <li className="hover:scale-105 hover:text-blue-500">To run promotions, contests, and surveys tailored to the men and women product categories.</li>
            <li className="hover:scale-105 hover:text-blue-500">To send periodic emails featuring updates on the latest trends and offers in men and women clothing.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800 animate-fade-in-up hover:text-blue-500 transition-all duration-300">
            Web Browser Cookies
          </h2>
          <p className="text-gray-700 mb-4 transition-all duration-300 hover:text-gray-900 hover:scale-105">
            Our Site may use "cookies" to enhance User experience. Cookies help us track which men and women product pages are viewed most frequently, analyze the effectiveness of product categories, and personalize the shopping experience based on user preferences. Users can choose to set their web browsers to refuse cookies or alert them when cookies are being sent. Please note that some parts of the Site, particularly product features related to men and women clothing, may not function properly without cookies.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800 animate-fade-in-up hover:text-blue-500 transition-all duration-300">
            How We Protect Your Information
          </h2>
          <p className="text-gray-700 mb-4 transition-all duration-300 hover:text-gray-900 hover:scale-105">
            We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, including usernames, passwords, transaction information, and data stored on our Site, particularly regarding your purchases from the men and women categories.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800 animate-fade-in-up hover:text-blue-500 transition-all duration-300">
            Sharing Your Personal Information
          </h2>
          <p className="text-gray-700 mb-4 transition-all duration-300 hover:text-gray-900 hover:scale-105">
            We do not sell, trade, or rent Users' personal identification information to others. We may share your information with third-party service providers that assist in fulfilling orders or improving customer service, particularly for men and women clothing products, but only as necessary for these purposes.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800 animate-fade-in-up hover:text-blue-500 transition-all duration-300">
            Your Acceptance of These Terms
          </h2>
          <p className="text-gray-700 mb-4 transition-all duration-300 hover:text-gray-900 hover:scale-105">
            By using this Site, including browsing and purchasing men and women clothing, you signify your acceptance of this policy. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800 animate-fade-in-up hover:text-blue-500 transition-all duration-300">
            Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 mb-4 transition-all duration-300 hover:text-gray-900 hover:scale-105">
            **Brohh Clothes** reserves the right to update this Privacy Policy at any time. We encourage Users to check this page frequently for any changes, especially those related to men and women clothing categories.
          </p>

          <p className="text-gray-700 mt-6 transition-all duration-300 hover:text-gray-900 hover:scale-105">
            If you have any questions about this Privacy Policy, please contact us through our ‘Contact Us’ page.
          </p>
        </div>
      </div>
    </>
  );
}
