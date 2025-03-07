import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Cup from "../assets/Cup.jpg";
import Frame from "../assets/Frame.jpg";
import Lock from "../assets/Lock.jpg";
import Pen from "../assets/Pen.jpg";
import Beautiful from "../assets/Beautiful.png";
import Aes from "../assets/Aes.png";
import Cpen from "../assets/Cpen.png";
import Namep from "../assets/Namep.png";
import Photo from "../assets/Photo.png";
import Pics from "../assets/Pics.png";
import Chai from "../assets/Chai.png";
import Bottle from "../assets/Bottle.jpg";
import Calli from "../assets/Calli.png";

const products = [
  { id: 1, img: Pen, name: "Customized Mugs", desc: "High-quality, personalized mugs perfect for gifting.", price: "₹250", originalPrice: "₹350" },
  { id: 2, img: Frame, name: "Customized Frames", desc: "Elegant custom frames to cherish your memories.", price: "₹350", originalPrice: "₹450" },
  { id: 3, img: Lock, name: "Customized Keychains", desc: "Stylish and durable personalized keychains.", price: "₹250", originalPrice: "₹300" },
  { id: 4, img: Cup, name: "Premium Pens", desc: "Premium engraved pens for a personal touch.", price: "₹250", originalPrice: "₹300" },
  { id: 5, img: Aes, name: "Customized Digital Frame", desc: "Premium aesthetic photo frame.", price: "₹350", originalPrice: "₹450" },
  { id: 6, img: Cpen, name: "Customized Pens", desc: "Customized engraved pens for a personal touch.", price: "₹250", originalPrice: "₹350" },
  { id: 7, img: Namep, name: "Customized Name Badge", desc: "Professionally engraved name badge.", price: "₹120", originalPrice: "₹299" },
  { id: 8, img: Photo, name: "Personalized Photo Collage", desc: "Customized photo collage.", price: "₹350", originalPrice: "₹450" },
  { id: 9, img: Pics, name: "Customized Polaroid Prints", desc: "Personalized polaroid-style prints.", price: "₹199", originalPrice: "₹299" },
  { id: 10, img: Chai, name: "Personalized Sublimation Mug", desc: "Beautiful sublimation mug.", price: "₹250", originalPrice: "₹350" },
  { id: 11, img: Bottle, name: "Personalized Engraved Bottle", desc: "Stylish bottle with custom engraving.", price: "₹399", originalPrice: "₹650" },
  { id: 12, img: Calli, name: "Customized Calligraphy Art", desc: "Handcrafted calligraphy artwork.", price: "₹400", originalPrice: "₹600" },
];

const Products = () => {
  return (
    <section id="products" className="p-6 sm:p-10">
     
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, index) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 });

          return (
            <motion.div
              key={product.id}
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Link to={`/product/${product.id}`} className="no-underline text-white">
                <div className="relative bg-purple-600 p-4 hover:scale-105 duration-500 sm:p-5 rounded-lg shadow-lg w-full text-center flex flex-col justify-between h-[360px] lg:h-[420px]">
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    20% OFF
                  </span>
                  <img src={product.img} alt={product.name} className="w-full rounded-lg mb-2 h-[230px] object-cover" />
                  <p className="font-bold text-sm sm:text-base flex-grow">{product.name}</p>
                  <p className="text-xs sm:text-sm text-gray-200 mt-1 flex-grow">{product.desc}</p>
                  <p className="text-yellow-300 font-semibold mt-1">
                    <span className="text-gray-300 line-through mr-2">{product.originalPrice}</span>
                    {product.price}
                  </p>
                  <div className="mt-3">
                  

<Link to="/order">
  <button className="bg-red-600 text-white py-1 px-4 w-full rounded-lg hover:bg-red-700">
    Buy Now
  </button>
</Link>

                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Products;