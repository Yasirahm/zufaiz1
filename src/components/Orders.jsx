import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

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
        <img src="data:image/jpeg;base64,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" alt="Coming Soon" class="w-24 h-24 mx-auto mb-4 animate-bounce"></img>
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
