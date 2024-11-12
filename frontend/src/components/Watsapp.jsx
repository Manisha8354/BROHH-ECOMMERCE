import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Watsapp() {
  return (
    <div>
      <div className='fixed right-10 z-10 bottom-3 flex flex-col items-center'>
      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/9851615555?text=Hello, I would like to chat with you!" // Corrected WhatsApp link with pre-filled message
        target="_blank"
        rel="noopener noreferrer"
      >
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#25D366' }} // WhatsApp green hover effect
          whileTap={{ scale: 0.95, backgroundColor: '#128C7E' }} // WhatsApp dark green on tap
          transition={{ duration: 0.3 }}
          className="bg-green-500 text-white font-semibold h-16 w-16 rounded-full shadow-md text-lg mb-4"
        >
          <FontAwesomeIcon icon={faWhatsapp} size="2x" /> {/* Larger icon size */}
        </motion.button>
      </a>
    </div>
    </div>
  )
}
