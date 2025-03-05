import React from "react";
import { useParams } from "react-router-dom";
import Cup from "../assets/Cup.jpg";
import Namep from "../assets/Namep.png";
import Calli from "../assets/Calli.png";
import Pen1 from "../assets/Pen1.png";
import pen2 from "../assets/Pen2.png";
import pen3 from "../assets/pen3.png";
import pic1 from "../assets/pics1.png";
import pic2 from "../assets/pics2.png";
import pic3 from "../assets/pics3.png";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";
import namep1 from "../assets/namep1.png";
import namep2 from "../assets/namep2.png";
import namep3 from "../assets/namep3.png";
import cpen1 from "../assets/cpen1.png";
import cpen2 from "../assets/cpen2.png";
import cpen3 from "../assets/cpen3.png";
import aes1 from "../assets/aes1.png";
import aes2 from "../assets/aes2.png";

import aes3 from "../assets/aes3.png";
import beautiful1 from "../assets/beautiful1.png";
import beautiul3 from "../assets/beautiful3.png";
import beautiful2 from "../assets/beautiful2.png";
import lock1 from "../assets/lock1.png";
import lock2 from "../assets/lock2.png";
import lock3 from "../assets/lock3.png";
import frame1 from "../assets/frame1.png";
import frame2 from "../assets/frame2.png";
import frame3 from "../assets/frame3.png";
import frame4 from "../assets/frame4.png";
import frame6 from "../assets/frame6.png";
import frame7 from "../assets/frame7.png";
import chai1 from "../assets/chai1.png";
import chai2 from "../assets/chai2.png";
import chai3 from "../assets/chai3.png";
import bottle1 from "../assets/bottle1.jpg";
import bottle2 from "../assets/bottle2.jpg";
import bottle3 from "../assets/bottle3.jpg";
import calli1 from "../assets/calli1.png";
import calli2 from "../assets/calli2.png";
import calli3 from "../assets/calli3.png";
import bottle4 from "../assets/bottle4.png";
import bottle5 from "../assets/bottle5.jpg";



import { Link } from "react-router-dom";

const productData = {
  1: { name: "Customized Mugs", desc: "High-quality, personalized mugs perfect for gifting.", price: "₹250", originalPrice: "₹350", deliveryCharge: " delivery charge as per shipping address", images: [chai1, chai2, chai3] },
  2: { name: "Customized Frames", desc: "Elegant custom frames to cherish your memories.", price: "₹350", originalPrice: "₹450", deliveryCharge: "delivery charge as per shipping address", images: [frame1, frame2, frame3, frame4, frame6, frame7] },
  3: { name: "Customized Keychains", desc: "Stylish and durable personalized keychains.", price: "₹250", originalPrice: "₹300", deliveryCharge: "delivery charge as per shipping address", images: [lock3, lock2, lock1] },
  4: { name: "Customized Pens", desc: "Elegant pens with custom engravings.", price: "₹250", originalPrice: "₹300", deliveryCharge: "delivery charge as per shipping address", images: [beautiful1, beautiul3, beautiful2] },
  5: { name: "Aesthetic Photo Frames", desc: "Beautiful frames to enhance your home decor.", price: "₹350", originalPrice: "₹450", deliveryCharge: "delivery charge as per shipping address", images: [aes1, aes2, aes3] },
  6: { name: "Customized Modern Pens", desc: "Personalized pens for a professional touch.", price: "₹250", originalPrice: "₹350", deliveryCharge: "delivery charge as per shipping address", images: [cpen2, cpen3, cpen1] },
  7: { name: "Customized Name Badges", desc: "Professional and stylish name badges.", price: "₹120", originalPrice: "₹299", deliveryCharge: "delivery charge as per shipping address", images: [namep3, namep2, namep1] },
  8: { name: "Personalized College Photos", desc: "Custom college photo prints.", price: "₹350", originalPrice: "₹450", deliveryCharge: "delivery charge as per shipping address", images: [photo3, photo2, photo1] },
  9: { name: "Customized Pics", desc: "Custom photo prints for personal use.", price: "₹199", originalPrice: "₹299", deliveryCharge: "delivery charge as per shipping address", images: [pic3, pic2, pic1] },
  10: { name: "Personalized Sublimation Mugs", desc: "Engraved mugs with unique designs.", price: "₹250", originalPrice: "₹350", deliveryCharge: "delivery charge as per shipping address", images: [pen3, pen2, Pen1] },
  11: { name: "Personalized Engraved Bottles", desc: "Stylish engraved water bottles.", price: "₹550", originalPrice: "₹650", deliveryCharge: "delivery charge as per shipping address", images: [bottle3, bottle5, bottle4 , bottle1] },
  12: { name: "Customized Calligraphy Art", desc: "Beautiful calligraphy artwork for decoration.", price: "₹400", originalPrice: "₹600", deliveryCharge: " delivery charge as per shipping address", images: [calli3, calli2, calli1] },
  };
  
  const ProductDetails = () => {
    const { id } = useParams();
    const product = productData[parseInt(id)]; // Convert id to number
  
    if (!product) {
      return <h2 className="text-center text-white">Product not found</h2>;
    }
  
    return (
      <section className="p-6 bg-purple-800 text-white min-h-screen">
        <div className="max-w-2xl mx-auto bg-purple-600 p-5 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
  
          {/* Image Slider */}
          <div className="flex overflow-x-auto gap-2">
            {product.images.map((img, index) => (
              <img key={index} src={img} alt={product.name} className="w-[350px] h-[400px] hover:scale-110 rounded-lg shadow-md" />
            ))}
          </div>
  
          <p className="mt-3">{product.desc}</p>
          <p className="text-yellow-300 font-semibold mt-2">
            <span className="text-gray-400 line-through mr-2">{product.originalPrice}</span>
            {product.price}
          </p>
  
          {/* Display Delivery Charge Only */}
          <div className="mt-3 text-gray-200">
            <p>Delivery Charge: <span className="text-yellow-300">{product.deliveryCharge}</span></p>
          </div>
  
          {/* Buy Now Button */}
          <div className="mt-5">
            <Link to="/order">
              <button className="bg-purple-900 text-white py-2 px-5 w-full rounded-lg hover:bg-green-700">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  };
  
  export default ProductDetails;
  