import React, { useState } from "react";
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import backgroundImage from '../../assets/pritam/contactpritam4.jpeg'
import img from '../../assets/pritam/1.png'
import Testimonials from "../Testimonials/Testimonials";

export default function Contact() {
    React.useEffect(() => {
        AOS.init({
          offset: 100,
          duration: 800,
          easing: "ease-in-sine",
          delay: 100,
        });
        AOS.refresh();
      }, []);


      
      const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
      });
    
      const [formErrors, setFormErrors] = useState({});
      const [successMessage, setSuccessMessage] = useState("");
      const [errorMessage, setErrorMessage] = useState("");
    
      let { name, email, message } = formData;
    
      // Handle input change
      const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
          ...formData,
          [id]: value,
        });
      };
    
      // Form validation logic
      const validateForm = () => {
        let errors = {};
        if (!formData.name) {
          errors.name = "Name is required.";
        }
        if (!formData.email) {
          errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = "Email is invalid.";
        }
        if (!formData.message) {
          errors.message = "Message is required.";
        }
        return errors;
      };
    
      // Handle form submission
      async function handleSubmit(e) {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);
        console.log(formData);
        // If no validation errors, submit the form
        if (Object.keys(errors).length === 0) {
          try {
            // Send form data to the backend API
            const response = await axios.post('https://actl.co.in/pritam/conatctSave', formData);
            alert("Your Contact Request Saved Successfully... ")
            // Display success message and reset form
            setSuccessMessage("Form submitted successfully!");
            setFormData({
              name: "",
              email: "",
              message: "",
            });
            setFormErrors({});
          } catch (error) {
            // Handle error from the backend
            setErrorMessage("Error submitting the form. Please try again.");
            console.error("Error submitting form:", error);
          }
        } else {
          setErrorMessage("Please correct the highlighted errors.");
        }
      }    
  return (
    <div>
      <>
      


      <div
      className="relative w-full h-96 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-center">
              {/* Phone Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mx-auto mb-2 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10l6 6m0 0l6-6m-6 6V3"
                />
              </svg>

              {/* Heading */}
              <h1 className="text-2xl sm:text-3xl md:text-[4rem] text-white font-bold font-serif mb-4">
                Contact Us
              </h1>

              {/* Paragraph with phone number */}
              <p className="text-white text-sm sm:text-lg md:text-xl mt-4">
               +91 98516 15555
              </p>
              <p className="text-white text-sm sm:text-lg md:text-xl mt-4">
  <a href="mailto:info@brohh.com" className="hover:underline">
  info@brohh.com

  </a>
</p>

            </div>
          </div>
        </div>
      </div>

      {/* Get in Touch Section */}
      <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6 ">
        {/* Header Section */}
        <h1 className="text-5xl font-bold mb-6 text-center font-serif">Get in Touch</h1>

        {/* Success/Error Messages */}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        {/* Contact Form and Image Section */}
        <div className="flex flex-col md:flex-row items-center gap-10">
  {/* Image Section */}
  <div className="w-full md:w-[600px] h-[600px]"> {/* Ensure this container takes full height */}
    <img
      className="w-full h-full object-cover rounded-lg shadow-md" // 'h-full' ensures the image matches the form height
      src={img}
      alt="Contact Us"
    />
  </div>

  {/* Contact Form Section */}
  <div className="w-full md:w-[600px] bg-black p-8 rounded-lg shadow-lg h-[600px]"> {/* Form container takes full height */}
    <form method="post" onSubmit={handleSubmit}>
      {/* Name Field */}
      <div className="mb-6">
        <label className="block text-gray-950 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className={`w-full px-4 py-3 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 ${formErrors.name ? "border-red-500" : ""}`}
          id="name"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={handleInputChange}
        />
        {formErrors.name && (
          <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="mb-6">
        <label className="block text-gray-950 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className={`w-full px-4 py-3 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 ${formErrors.email ? "border-red-500" : ""}`}
          id="email"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={handleInputChange}
        />
        {formErrors.email && (
          <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
        )}
      </div>

      {/* Message Field */}
      <div className="mb-6">
        <label className="block text-gray-950 text-sm font-bold mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          className={`w-full px-4 py-3 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 ${formErrors.message ? "border-red-500" : ""}`}
          id="message"
          rows="5"
          placeholder="Your Message"
          value={message}
          onChange={handleInputChange}
        ></textarea>
        {formErrors.message && (
          <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300 ease-in-out"
          type="submit"
        >
          Send Message
        </button>
      </div>
    </form>
  </div>
</div>

      </div>
      <Testimonials/>
      
      </>
    </div>
  )
}
