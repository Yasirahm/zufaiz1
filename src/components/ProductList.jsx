import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Importing delete icon
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import About from "./About";
import Hero from "./Hero";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Admin check state
  const navigate = useNavigate();
  const auth = getAuth(); // Firebase Auth instance

  // Fetch Products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  // Check if logged-in user is the admin
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.email === "ratherseenu16@gmail.com") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, [auth]);

  // Function to Delete Product
  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", productId));
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <>    <div className="max-w-6xl mx-auto p-6">
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-purple-600 shadow-md rounded-lg p-4 relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-xl text-white font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-200">{product.description}</p>
            <p className="text-lg font-bold text-red-600">₹{product.price}</p>

            <div className="flex mt-3 gap-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                View Details
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={() => navigate(`/order/${product.id}`)}
              >
                Buy Now
              </button>
            </div>

            {/* Delete Button (Only Visible to Admin "yasir@gmail.com") */}
            {isAdmin && (
              <button
                onClick={() => deleteProduct(product.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition"
                title="Delete Product"
              >
                <FaTrash className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        ))}
      </div>
      
    </div>

    <Hero/>

      <About />
    </>

  );
};

export default ProductList;
