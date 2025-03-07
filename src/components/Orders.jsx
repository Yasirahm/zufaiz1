import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from 'framer-motion';

const ADMIN_EMAIL = "ratherseenu16@gmail.com";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localOrder, setLocalOrder] = useState(null);

  useEffect(() => {
    let unsubscribeOrders = null;

    const fetchOrders = (email) => {
      if (!email) return;
      let q = email === ADMIN_EMAIL ? query(collection(db, "orders")) : query(collection(db, "orders"), where("email", "==", email));

      unsubscribeOrders = onSnapshot(q, (querySnapshot) => {
        const ordersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        fetchOrders(user.email);
      } else {
        setUserEmail(null);
        setOrders([]);
        setLoading(false);
      }
    });

    const storedOrder = localStorage.getItem("userOrder");
    if (storedOrder) {
      setLocalOrder(JSON.parse(storedOrder));
    }

    return () => {
      if (unsubscribeOrders) unsubscribeOrders();
      unsubscribeAuth();
    };
  }, []);

  const isAdmin = userEmail === ADMIN_EMAIL;

  if (loading) {
    return <div className="text-center text-gray-500 text-xl mt-10">⏳ Loading orders...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-4 text-purple-700">📋 Your Orders</h2>
        {isAdmin ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Contact</th>
                  <th className="border p-2">Product</th>
                  <th className="border p-2">District</th>
                  <th className="border p-2">Village</th>
                  <th className="border p-2">Pincode</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border bg-gray-100 hover:bg-gray-200">
                    <td className="border p-2">{order.name}</td>
                    <td className="border p-2">{order.email}</td>
                    <td className="border p-2">{order.contact}</td>
                    <td className="border p-2">{order.printName}</td>
                    <td className="border p-2">{order.district}</td>
                    <td className="border p-2">{order.village}</td>
                    <td className="border p-2">{order.pincode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-lg font-semibold">
            <div class="bg-white shadow-lg rounded-lg p-8 text-center max-w-screen">
            <motion.img
  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4KJmpYlKZHD859RPHPXYvl3dhHkzGJ1LwOAJ2YeDoQ&s" // Replace with your image URL
  alt="Animated Image"
  className="mx-auto w-32 h-32" // Center the image and set size
  animate={{
    y: [0, -10, 0], // Move up and down
  }}
  transition={{
    repeat: Infinity, // Infinite bounce
    repeatType: "reverse", // Smooth up and down
    duration: 1.5, // Animation speed
    ease: "easeInOut",
  }}
/>

        <h2 class="text-3xl font-bold text-blue-600">🚀 This Feature Coming Soon!</h2>
        <p class="mt-3 text-sm text-gray-700">We're working hard to bring this Feature! Stay tuned as we prepare for launch. It's going to be worth the wait! 🔥✨</p>
        <div class="mt-4">
            <span class="inline-block bg-blue-500 text-white text-sm px-4 py-2 rounded-full shadow-md">🔔 Stay Updated!</span>
        </div>
    </div>
            {orders.length > 0 ? (
              <div className="text-green-600">
                🎉 <strong>Great news!</strong> Your order is confirmed! 🚀
                <p className="mt-2 text-gray-700">
                  We are processing your order and will notify you soon. Stay excited! 🎁
                </p>
                {localOrder && (
                  <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                    <p className="text-gray-800"><strong>📦 Product:</strong> {localOrder.printName}</p>
                    <p className="text-gray-800"><strong>📍 District:</strong> {localOrder.district}</p>
                    <p className="text-gray-800"><strong>🏡 Village:</strong> {localOrder.village}</p>
                    <p className="text-gray-800"><strong>📮 Pincode:</strong> {localOrder.pincode}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div class=" bg-white p-6 rounded-lg shadow-md text-center">
        <h2 class="text-2xl font-bold text-green-600">🎉 Order Received! 🎉</h2>
        <p class="mt-3 text-sm text-gray-700">Thank you for your order! 🛍️ We truly appreciate your trust in us. Our team is already working on processing your request, and we will make sure to dispatch your order as quickly as possible. 🚀</p>

        <div class="mt-4 bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 class="text-lg font-semibold text-blue-600">📦 What happens next?</h3>
            <ul class="mt-2 text-gray-700 text-sm space-y-2 text-left">
                <li>✅ We are carefully preparing your order.</li>
                <li>✅ You will receive updates as we move forward.</li>
                <li>✅ If you have any questions, feel free to reach out.</li>
            </ul>
        </div>

        <p class="mt-4 text-gray-800 font-semibold">Stay excited! Your order will be on its way soon. 😊💖</p>
    </div>
                <h2 className="text-2xl font-bold text-red-500">🛒 No Orders Found!</h2>
                <p className="mt-3 text-gray-700">It looks like you haven't placed any orders yet.</p>
                <p className="text-gray-800 mt-2">Browse our store and grab your favorite items today! 🛍️</p>
                

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
