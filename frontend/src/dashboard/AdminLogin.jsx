import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const AdminLogin = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign up
  const [loading, setLoading] = useState(false); // Toggle between login and sign up
  let navigation = useNavigate()
  let {setAdminFlag} = useContext(UserContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form
  const validate = () => {
    let validationErrors = {};

    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email address is invalid';
    }

    // if (!formData.password) {
    //   validationErrors.password = 'Password is required';
    // } else if (formData.password.length < 6) {
    //   validationErrors.password = 'Password must be at least 6 characters';
    // }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
        let result = await axios.post('https://actl.co.in/pritam/adminlogin', formData)
        // console.log(result)
      if(result.data == true) {
          setAdminFlag(true)
          navigation('/admin')
        }
       else {
        alert("You Enter the wrong details")
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-20 mb-2">
        <h2 className="text-3xl font-bold mb-6 text-center text-black ">
          Admin Log In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">


          {/* Email field */}
          <div>
            <label className="block text-black font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password field */}
          <div>
            <label className="block text-black font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

        

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-200"
          >
            Login
          </button>
        </form>

       
      </div>
    </div>
  );
};

export default AdminLogin;
