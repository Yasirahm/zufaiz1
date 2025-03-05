import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaStar, FaHeadset } from "react-icons/fa";
import Man from "../assets/Logo.jpg";
import DownloadAppSection from "./DownloadAppSection";

const About = () => {
  return (
    <>
      {/* Heading */}
      <motion.h1
        className="text-xl md:text-3xl lg:text-4xl p-4 bg-gradient-to-r from-purple-800 to-gray-800 text-orange-500 font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        About Us
      </motion.h1>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between py-10 px-6 lg:px-20 min-h-screen gap-10">
        
        {/* Left Section */}
        <motion.div
          className="lg:w-1/2 w-full space-y-6 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-gray-400 text-lg">Hello & Welcome</p>
          <h1 className="text-lg md:text-3xl lg:text-5xl font-bold text-white">
            👉 This is <span className="text-red-500">Zufaiz Saneen Store</span>
          </h1>
          <div className="flex flex-col gap-3 text-lg text-gray-100">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <FaShoppingCart className="text-blue-500 text-xl" />
              <span className="font-semibold lg:text-lg text-sm">High-Quality Products</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <FaStar className="text-yellow-500 text-xl" />
              <span className="font-semibold lg:text-lg text-sm">Affordable Prices</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <FaHeadset className="text-green-500 text-xl" />
              <span className="font-semibold lg:text-lg text-sm">24/7 Customer Support</span>
            </div>
          </div>
          <p className="text-gray-200 text-xs md:text-lg">
            We are a team of dedicated professionals committed to quality, reliability, and customer satisfaction. Our mission is to provide authentic and trendy products that cater to your needs and enhance your lifestyle.
          </p>
        </motion.div>

        {/* Right Section - Image */}
        <motion.div
          className="lg:w-1/2 w-full flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="relative p-2 rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={Man}
              alt="Profile"
              className="w-52 h-52 md:w-72 md:h-72 lg:w-96 lg:h-96 object-cover rounded-full shadow-lg"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
      <DownloadAppSection/>
    </>
  );
};

export default About;
