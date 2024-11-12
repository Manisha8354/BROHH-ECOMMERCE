import React from 'react';
import { motion } from 'framer-motion';

import AOS from "aos";
import "aos/dist/aos.css";
import img from '../../assets/pritam/19.png';
import img1 from '../../assets/pritam/2.png';
import Testimonials from '../Testimonials/Testimonials';

export default function About() {
    React.useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 800,
            easing: "ease-in-sine",
            delay: 100,
        });
        AOS.refresh();
    }, []);

    return (
        <>
            <div className="h-fit pb-5 transition-all duration-700 ease-in-out shadow-lg bg-gray-100">
                <div className="h-32 flex items-center justify-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-3xl md:text-5xl font-bold text-black mb-4 hover:text-yellow-300 transition duration-300 ease-in-out"
                    >
                        Who We Are
                    </motion.h2>
                </div>

                {/* Container for the content */}
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                    
                    {/* Image Section - two images on the left side */}
                    <div className="md:w-1/2 flex flex-col space-y-4 md:space-y-8 overflow-hidden">
                    <motion.img
        src={img}
        alt="Electric Appliances 1"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="rounded-lg shadow-lg w-full md:h-[500px] object-cover mx-auto md:mx-0"
    />
                       
                    </div>

                    {/* Text Content */}
                    <div className="md:w-1/2 md:ml-8 mt-8 md:mt-0">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-3xl md:text-4xl font-bold text-black mb-6"
                        >
                            Welcome to Brohh: Brohh up your style
                        </motion.h1>

                        <div className="space-y-4">
                            {[
                                "Welcome to Brohh, where your style blossoms, just like nature intended. We believe fashion is more than just about trends; it’s a reflection of authenticity and individuality. Every piece in our collection is thoughtfully curated to empower you to express your true self, merging comfort, style, and sustainability.",

                                "At Brohh, fashion transcends beyond just clothing—it’s a movement towards conscious living, where your personal style evolves naturally, confidently, and fearlessly. Whether you’re dressing for a casual day out or a special occasion, our designs ensure that you not only look great but feel good about the choices you make.",
                                

                                
                            ].map((text, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.6 + index * 0.3 }}
                                    className="text-black leading-relaxed mb-4"
                                >
                                    {text}
                                </motion.p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Testimonials/>
        </>
    );
}
