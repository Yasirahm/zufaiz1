import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

const ADMIN_EMAILS = ["ratherseenu16@gmail.com", "admin2@gmail.com"]; // Add actual admin emails

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    details: "",
    
    price: "",
    imageUrl: "",
  });

  // Check user authentication and admin status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && ADMIN_EMAILS.includes(currentUser.email)) {
        setUser(currentUser);
        setIsAdmin(true);
      } else {
        navigate("/"); // Redirect unauthorized users
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fetch Product Data
  useEffect(() => {
    if (!isAdmin) return;
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("No such product!");
      }
    };
    fetchProduct();
  }, [id, isAdmin]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await updateDoc(doc(db, "products", id), product);
    
    Swal.fire({
      icon: "success",
      title: "Product Updated!",
      text: "Product updated successfully.",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });

    navigate(`/product/${id}`);
  } catch (error) {
    console.error("Error updating product:", error);
    
    Swal.fire({
      icon: "error",
      title: "Update Failed!",
      text: "Failed to update product. Please try again.",
      confirmButtonColor: "#d33",
      confirmButtonText: "OK",
    });
  }
};

  if (!isAdmin) return null; // Hide everything if the user is not an admin

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="text-sm text-yellow-800">Product Name</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full p-2 border-4 rounded-md" placeholder="Product Name" required />
        <label className="text-sm text-yellow-800">Description</label>
        <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-2 border-4 rounded-md" placeholder="Description" required />
        <label className="text-sm text-yellow-800">Details</label>
        <textarea name="details" value={product.details} onChange={handleChange} className="w-full p-2 border-4 rounded-md" placeholder="Details" required />
       
        <label className="text-sm text-yellow-800">Price</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full p-2 border-4 rounded-md" placeholder="Price" required />
        <label className="text-sm text-yellow-800">ImageUrl</label>
        <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} className="w-full p-2 border-4 rounded-md" placeholder="Image URL" required />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
