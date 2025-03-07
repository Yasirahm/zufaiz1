import React, { useState } from "react";
import { db } from "../firebase"; // Import Firestore database
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // ✅ Correct import

const Order = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    printName: "",
    district: "",
    village: "",
    landmark: "",
    pincode: "",
    message: "",
  });

  const googleFormAction = "https://docs.google.com/forms/d/e/1FAIpQLSd5HiJtVIZ12UULdLjCczx5CYKZd9Zvv746nDA4OqeSQeirQw/formResponse"; // Replace with your Google Form URL

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save order in Firebase Firestore
      await addDoc(collection(db, "orders"), {
        ...formData,
        timestamp: serverTimestamp(), // Add timestamp
      });

      // Save order in Local Storage (optional)
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem("orders", JSON.stringify([...existingOrders, formData]));

      // Show success message
      alert("🎉 Order placed successfully! We will process it soon.");

      // Google Forms Submission
      const form = document.createElement("form");
      form.method = "POST";
      form.action = googleFormAction;

      const entries = {
        "entry.99903242": formData.name, // Full Name
        "entry.1920771179": formData.email, // Email
        "entry.1552338354": formData.contact, // Contact
        "entry.16271471": formData.printName, // Name to Print
        "entry.776742113": formData.village, // Village
        "entry.653728538": formData.landmark, // Landmark
        "entry.482026219": formData.pincode, // Pincode
        "entry.1054901724": formData.message, // Message
      };

      Object.keys(entries).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = entries[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      // Clear form after submission
      setFormData({
        name: "",
        email: "",
        contact: "",
        printName: "",
        district: "",
        village: "",
        landmark: "",
        pincode: "",
        message: "",
      });

    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("⚠️ Failed to place order. Please try again.");
    }
    const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "orders"), {
        ...formData,
        timestamp: serverTimestamp(),
      });

      alert("🎉 Order placed successfully! We will process it soon.");

      setFormData({
        name: "",
        email: "",
        contact: "",
        printName: "",
        district: "",
        village: "",
        landmark: "",
        pincode: "",
        message: "",
      });

      navigate("/orders"); // Navigate to Orders.jsx page after submission
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("⚠️ Failed to place order. Please try again.");
    }
  };
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-800 to-gray-800">
      <div className="shadow-lg p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-200">
          Final Checkout 🛒
        </h2>
        <p className="text-center text-gray-300 mb-4">
          Please fill in your details below to complete your order.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="w-full p-2 border rounded" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 border rounded" />
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number" required className="w-full p-2 border rounded" />
          <input type="text" name="printName" value={formData.printName} onChange={handleChange} placeholder="Name to Print on your product" required className="w-full p-2 border rounded" />
          <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="District" required className="w-full p-2 border rounded" />
          <input type="text" name="village" value={formData.village} onChange={handleChange} placeholder="Village" required className="w-full p-2 border rounded" />
          <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Landmark" required className="w-full p-2 border rounded" />
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required className="w-full p-2 border rounded" />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="3" className="w-full p-2 border rounded"></textarea>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-900 text-white py-2 rounded-lg hover:bg-purple-800 transition">
            Submit Order 🚀
          </button>
        </form>
        <p className="mt-6 text-center font-bold">
          ✅ Fast Shipping – Sit back and relax while we deliver your order! 🚚
        </p>
      </div>
    </div>
  );
};

export default Order;
