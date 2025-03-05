import React, { useState } from "react";

const Order = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    printName: "", // Name to Print
    district: "",
    village: "",
    landmark: "",
    pincode: "",
    message: "",
  });

  const googleFormAction =
    "https://docs.google.com/forms/d/e/1FAIpQLSd5HiJtVIZ12UULdLjCczx5CYKZd9Zvv746nDA4OqeSQeirQw/formResponse";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show Alert Message before Submission
    alert(
      "🎉 Your order has been placed successfully!\n📦 We will process your order soon.\n🕒 You will receive a confirmation email shortly.\n🚀 Thank you for shopping with us!"
    );

    const form = document.createElement("form");
    form.method = "POST";
    form.action = googleFormAction;

    // Mapping form data to Google Form entry fields
    const entries = {
      "entry.99903242": formData.name,        // Full Name
      "entry.1920771179": formData.email,     // Email
      "entry.1552338354": formData.contact,   // Contact
      "entry.16271471": formData.printName,   // Name to Print on Gadget
      "entry.776742113": formData.village,    // Village
      "entry.653728538": formData.landmark,   // Landmark
      "entry.482026219": formData.pincode,    // Pincode
      "entry.1054901724": formData.message,   // Message
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
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-800 to-gray-800">
      <div className=" shadow-lg p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-200">
          Final Checkout 🛒
        </h2>
        <p className="text-center text-gray-300 mb-4">
          Please fill in your details below to complete your order.  
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact Number"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="printName"
            value={formData.printName}
            onChange={handleChange}
            placeholder="Name to Print on your product"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="District"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="village"
            value={formData.village}
            onChange={handleChange}
            placeholder="Village"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            placeholder="Landmark"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="3"
            className="w-full p-2 border rounded"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-900 text-white py-2 rounded-lg hover:bg-purple-800 transition"
          >
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
