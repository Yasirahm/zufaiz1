import React from "react";
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
  import { InView } from "react-intersection-observer";

const Footer = () => {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="text-white border-t-4 border-t-transparent bg-gradient-to-r from-purple-700 via-pink-900 to-gray-800 bg-clip-border p-6 text-center relative">
      <div className="absolute top-0 left-0 right-0 border-t-4 border-t-transparent bg-gradient-to-r from-gray-200 via-transparent to-gray-400 bg-clip-border"></div>

      <InView threshold={0.1}>
        {({ inView, ref }) => (
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <p className="text-sm sm:text-base">
                &copy; 2025 The Zufaiz Saneen Store. All rights reserved.&trade;
              </p>
              <p className="text-xs sm:text-sm mt-2">
                🚀 Your one-stop shop for premium personalized products.
                <br />
                🌍 We deliver products all over Kashmir with fast shipping!
              </p>
              <p className="text-xs sm:text-sm mt-2">
                📞 Need help? Contact us at{" "}
                <a
                  href="mailto:support@zufaizsaneenstore.com"
                  className="underline"
                >
                  zufaizsaneen@gmail.com
                </a>
              </p>
              <p className="mt-4 text-xs sm:text-sm italic">
                🌙 "Indeed, Allah is the Bestower of mercy." - Surah Al-Baqarah 2:261
              </p>
             
            </div>

            <div className="flex justify-center space-x-6 mt-10">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/zufaizsaneen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:scale-110 transition duration-300"
              >
                <FaLinkedin size={28} />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/the_zufaiz_saneen_store"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:scale-110 transition duration-300"
              >
                <FaInstagram size={28} />
              </a>

              {/* Twitter */}
              
            </div>

            {/* Scroll to Top Button */}
            
          </motion.div>
        )}
      </InView>
    </footer>
  );
};

export default Footer;
