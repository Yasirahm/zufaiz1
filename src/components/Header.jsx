import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Logo from "../assets/Logo.jpg";
import { GiAbstract016 } from "react-icons/gi"; // Calligraphy-style logo
import { FaArrowUp, FaGift } from "react-icons/fa"; // Up Arrow & Customized Products Icon

const Header = () => {
  const [scrollingUp, setScrollingUp] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll();
  const rotateIcon = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setScrollingUp(true);
      } else {
        setScrollingUp(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="w-screen text-white text-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Logo & Store Info */}
      <div className="p-4 flex flex-col items-center">
        {/* Rotating Logo */}
        <motion.img
          src={Logo}
          alt="The Zufaiz Saneen Store Logo"
          className="w-28 sm:w-36 md:w-40 h-auto rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 flex items-center gap-2"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Calligraphy-style rotating icon */}
          <motion.div style={{ rotate: rotateIcon }}>
            <GiAbstract016 className="text-yellow-400 text-4xl" />
          </motion.div>
          The Zufaiz Saneen Store
        </motion.h1>
        
        <p className="text-sm sm:text-base md:text-lg">
          Your one-stop shop for customized gifts
        </p>
      </div>
      
      <div className="font-bold text-center lg:text-2xl md:text-2xl text-xs text-orange-500 hover:text-blue-400">
        <TypeAnimation
          sequence={[
            "Welcome to The Zufaiz Saneen Store!", 2000,
            "Discover Quality Products at Affordable Prices.", 2000,
            "Shop Now and Experience Excellence.", 2000,
            "Fast & Reliable Delivery – Just a Click Away!", 2000,
            "Your Satisfaction, Our Priority.", 2000,
            "Get in Touch for Custom Orders!", 2000,
          ]}
          wrapper="span"
          speed={90}
          repeat={Infinity}
        />
      </div>

      {/* Navigation Bar */}
      <motion.nav
        className="bg-gradient-to-r from-purple-800 to-gray-900 py-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        <ul className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-sm sm:text-base md:text-lg font-semibold">
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link to="#top" className="hover:text-yellow-400 transition duration-300">
              Home
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
          <Link to="/orders" className="hover:text-yellow-400">Your Orders</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link to="/order" className="hover:text-yellow-400 transition duration-300">
              Order Now
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link to="/contact">
              <motion.button
                className="bg-red-600 text-white py-1 px-4 w-full rounded-lg hover:bg-red-700"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Request a Callback
              </motion.button>
            </Link>
          </motion.li>
        </ul>
      </motion.nav>

      {/* Scroll Up Button */}
      {scrollingUp && (
        <motion.div
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full cursor-pointer"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FaArrowUp size={24} />
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;