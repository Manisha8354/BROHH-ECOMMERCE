import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; 

export default function AdminNav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <>
     <div>
      <header className="bg-gray-800 text-white fixed w-full z-50">
        <nav className="flex items-center justify-between p-4 relative">
          
          {/* Left side: Admin Text */}
          <div className="text-xl font-bold">
            Admin Panel
          </div>

          {/* Toggle Menu Button (for mobile view) */}
          <button
            className="md:hidden p-2 text-white"
            onClick={toggleMenu}
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>

          {/* Menu items (for mobile view) */}
          <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} absolute top-16 left-0 w-full bg-gray-700 p-4`}>
            <a href="#" className="block py-2 text-gray-300 hover:text-white">Dashboard</a>
            <a href="#" className="block py-2 text-gray-300 hover:text-white">Reports</a>
            <a href="#" className="block py-2 text-gray-300 hover:text-white">Settings</a>
          </div>

          {/* User Icon (for desktop and mobile view) */}
          <div className="hidden md:flex items-center space-x-4">
            <FaUserCircle className="text-2xl cursor-pointer hover:text-gray-400" />
          </div>

        </nav>
      </header>
    </div>
    </>
  )
}
