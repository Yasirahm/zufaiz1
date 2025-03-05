import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const OrderNow = lazy(() => import("./components/OrderNow"));
const ProductEdit = lazy(() => import("./components/ProductEdit"));
const Kas = lazy(() => import("./components/Kas"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Order = lazy(() => import("./components/Order"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// Fallback UI with Spinner
const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
  </div>
);

const App = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-purple-800 via-orange-900 to-gray-700 animated-gradient">
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/kas" element={<Kas />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/order/:id" element={<OrderNow />} />
        <Route path="/admin/edit/:id" element={<ProductEdit />} />
        <Route path="/Order" element={<Order />} />
      </Routes>
    </Suspense>
    </div>
    </>
  );
};

export default App;
