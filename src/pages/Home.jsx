import React from "react";
import ProductUpload from "../components/ProductUpload";
import ProductList from "../components/ProductList";
import Header from "../components/Header";
import AdminDashboard from "./AdminDashboard";
import Hero from "../../../ah/src/components/Hero";
import Feedback from "../../../ah/src/components/Feedback";
import Contact from "../components/Contact";
import Footer from "../components/Footer";



const Home = ({ productListRef }) => {
  return (
    <>
      <Header/>
      <AdminDashboard/>
      <ProductUpload />
      
      
    <div className=" bg-gradient-to-r from-purple-800 via-orange-900 to-gray-700 p-6">
    
    
      <h2 className="text-3xl font-bold text-center text-gray-200 mb-6"> Products</h2>

      {/* Product Upload Section */}
      <div className="max-w-3xl mx-auto bg-gray-400 p-3 shadow-md rounded-lg mb-8">
     
        
      </div>

      {/* Product List Section */}
      <div className="container mx-auto">
        <ProductList />
        <Feedback/>
        <Contact/>
        <Footer/>
      </div>
    </div>
    </>
  );
};

export default Home;
