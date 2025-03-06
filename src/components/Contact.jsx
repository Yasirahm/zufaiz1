import React, { useState } from "react";

import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    rating: "5",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleFormURL =
    "https://docs.google.com/forms/d/e/1FAIpQLScIatpZmBoiBGtJtsJLI6tLc7kO4kiKyTdyup2XvRa19W14cQ/formResponse";

  const formEntries = {
    name: "entry.365905075",
    email: "entry.2068531061",
    phone: "entry.1372752736",
    message: "entry.289773100",
    rating: "entry.184314832",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append(formEntries.name, formData.name);
    formDataToSend.append(formEntries.email, formData.email);
    formDataToSend.append(formEntries.phone, formData.phone);
    formDataToSend.append(formEntries.message, formData.message);
    formDataToSend.append(formEntries.rating, formData.rating);

    try {
      await fetch(googleFormURL, {
        method: "POST",
        body: formDataToSend,
        mode: "no-cors",
      });
      alert("Your message has been sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "", rating: "5" });
    } catch (error) {
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center px-6">
      <motion.h2
        className="text-3xl mt-20 bg-gradient-to-r from-purple-800 to-gray-800 font-bold text-black text-center mb-6"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        Get in Touch
      </motion.h2>
      <motion.p
        className="text-gray-200 text-center text-sm mb-6"
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        Have questions or custom requests? Fill out the form below, and we’ll get back to you soon.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4"
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {Object.keys(formEntries).map((field, index) => (
          <motion.div 
            key={field}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <label className="block text-gray-200 font-semibold">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            {field !== "rating" ? (
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            ) : (
              <select
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="5">⭐️⭐️⭐️⭐️⭐️ (Excellent)</option>
                <option value="4">⭐️⭐️⭐️⭐️ (Good)</option>
                <option value="3">⭐️⭐️⭐️ (Average)</option>
                <option value="2">⭐️⭐️ (Poor)</option>
                <option value="1">⭐️ (Very Bad)</option>
              </select>
            )}
          </motion.div>
        ))}

        <motion.button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 rounded-lg transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </motion.button>
      </motion.form>

      <motion.div
        className="mt-8 text-center text-gray-100"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 1 }}
      >
        <p>📍 <strong>Address:</strong> LalBazaar Srinagar</p>
        <p>📞 <strong>Phone:</strong> Request a callback we will call you</p>
        <p>📧 <strong>Email:</strong> zufaizsaneen@gmail.com</p>
        <p>🕒 <strong>Working Hours:</strong> Everyday, 9 AM - 5 PM</p>
      </motion.div>

      <motion.section
        id="contact"
        className="p-6 text-center"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-xl font-bold text-white">Order Now</h2>
        <p className="text-sm font-bold">Order through our Instagram page:</p>
        <a
          href="https://www.instagram.com/the_zufaiz_saneen_store"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 text-3xl font-bold flex justify-center hover:text-red-700 mt-2"
        >
          <FaInstagram />
        </a>
      </motion.section>
    </div>
  );
};

export default Contact;
