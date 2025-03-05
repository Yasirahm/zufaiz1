import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import { FaTrash, FaPlus, FaShareAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const adminEmails = ["ratherseenu16@gmail.com", "admin@gmail.com"];

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState(0);
  const [logins, setLogins] = useState(0);
  const [orders, setOrders] = useState(0);
  const [bills, setBills] = useState([]);
  const [totalGained, setTotalGained] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);

  const [newBill, setNewBill] = useState({
    customerName: "",
    productType: "",
    address: "",
    contact: "",
    
    totalAmount: "",
    paidAmount: "",
    pendingAmount: "",
    date: new Date().toLocaleDateString(),
  });
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && adminEmails.includes(user.email)) {
        setIsAdmin(true);
        fetchData();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    setSales((await getDocs(collection(db, "sales"))).size);
    setLogins((await getDocs(collection(db, "logins"))).size);
    setOrders((await getDocs(collection(db, "orders"))).size);
    const billDocs = await getDocs(collection(db, "bills"));
    const billsData = billDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBills(billsData);
    setTotalGained(billsData.reduce((sum, bill) => sum + Number(bill.totalAmount), 0));
    setTotalPaid(billsData.reduce((sum, bill) => sum + Number(bill.paidAmount), 0));
    setTotalUnpaid(billsData.reduce((sum, bill) => sum + Number(bill.pendingAmount), 0));
  };
  

  const addBill = async () => {
    const updatedBill = {
      ...newBill,
      pendingAmount: newBill.totalAmount - newBill.paidAmount,
    };
    await addDoc(collection(db, "bills"), updatedBill);
    setNewBill({
      customerName: "",
      productType: "",
      address: "",
      contact: "",
      
      totalAmount: "",
      paidAmount: "",
      pendingAmount: "",
      date: new Date().toLocaleDateString(),
    });
    
    fetchData();
  };
  

  const deleteBill = async (id) => {
    await deleteDoc(doc(db, "bills", id));
    fetchData();
  };

  const shareBill = (bill) => {
    const billDetails = `Bill Details:\nCustomer: ${bill.customerName}\nType: ${bill.productType}\nAddress: ${bill.address}\nContact: ${bill.contact}\n Total: ₹${bill.totalAmount}\nPaid: ₹${bill.paidAmount}\nPending: ₹${bill.pendingAmount}\nDate: ${bill.date}`;
    navigator.share({ text: billDetails }).catch(() => alert("Sharing not supported"));
  };

  if (loading) return <p className="text-center">Checking access...</p>;
  if (!isAdmin) return <p className="text-center text-red-500"></p>;

  return (
    <motion.div className="p-4 sm:p-6 bg-gradient-to-r from-purple-800 via-orange-900 to-gray-700 min-h-screen" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
  <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-200">Admin Dashboard</h2>

  {/* Stats Section */}
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 my-4 sm:my-6">
    {[
      { title: "Total Customers", value: bills.length, color: "bg-blue-500" },
      { title: "Total Gained", value: `₹${totalGained}`, color: "bg-green-500" },
      { title: "Total Paid", value: `₹${totalPaid}`, color: "bg-purple-500" },
      { title: "Total Unpaid", value: `₹${totalUnpaid}`, color: "bg-red-500" },
    ].map((stat, index) => (
      <div key={index} className={`${stat.color} text-white p-3 sm:p-4 rounded-lg text-center text-xs sm:text-xl`}> 
        <h3 className="font-semibold">{stat.title}</h3>
        <p>{stat.value}</p>
      </div>
    ))}
  </div>

  {/* Billing System */}
  <div className="bg-gradient-to-r from-purple-800 via-orange-900 to-gray-700 p-4 sm:p-6 rounded-lg shadow-md">
    <h3 className="text-xl text-white sm:text-2xl font-semibold mb-4">The zufaiz saneen store Billing System</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Object.keys(newBill).map((key) => (
        key !== "pendingAmount" && key !== "date" && (
          <input 
            key={key} 
            type={key.includes("Amount") ? "number" : "text"} 
            placeholder={key} 
            value={newBill[key]} 
            onChange={(e) => setNewBill({ ...newBill, [key]: e.target.value })} 
            className="p-2 border rounded w-full"
          />
        )
      ))}
      <button onClick={addBill} className="bg-blue-600 text-white p-2 rounded col-span-1 sm:col-span-2 md:col-span-3 w-full flex items-center justify-center gap-2">
        <FaPlus /> Add Bill
      </button>
    </div>

    {/* Display Bills */}
    <ul className="mt-6 space-y-4">
      {bills.map((bill) => (
        <li 
          key={bill.id} 
          className="bg-gradient-to-r from-purple-800 via-orange-900 to-gray-700  shadow-2xl p-4 rounded-xl border-l-8 border-blue-500 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="text-gray-800 w-full sm:w-auto text-center  sm:text-left">
            <p className="font-semibold text-lg">
              <span className="text-purple-300">👤 {bill.customerName}</span>
            </p>
            <p className="text-sm text-gray-100">🏗 <span className="font-medium">Product Type:</span> {bill.hamaamType}</p>
            <p className="text-sm text-gray-200">📞 <span className="font-medium">Contact:</span> {bill.contact}</p>
            <p className="text-sm text-gray-100">💰 <span className="font-medium">Total:</span> ₹{bill.totalAmount}</p>
            <p className={`text-sm font-semibold ${bill.pendingAmount > 0 ? "text-red-500" : "text-green-500"}`}>
              ⏳ Pending: ₹{bill.pendingAmount}
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => shareBill(bill)}
              className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
              title="Share Bill"
            >
              <FaShareAlt className="w-5 h-5" />
            </button>

            <button
              onClick={() => deleteBill(bill.id)}
              className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition"
              title="Delete Bill"
            >
              <FaTrash className="w-5 h-5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
</motion.div>
  );
};

export default AdminDashboard;
