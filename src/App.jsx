import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Lazy-loaded pages & components
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
const Orders = lazy(() => import("./components/Orders"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// Fallback UI with Spinner
const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
  </div>
);

const App = () => {
  return (
    <div className="bg-gradient-to-r from-purple-800 via-orange-900 to-gray-700 animated-gradient">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<Loading />}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/home"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/kas"
          element={
            <Suspense fallback={<Loading />}>
              <Kas />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<Loading />}>
              <AdminDashboard />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<Loading />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Suspense fallback={<Loading />}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route
          path="/order/:id"
          element={
            <Suspense fallback={<Loading />}>
              <OrderNow />
            </Suspense>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <Suspense fallback={<Loading />}>
              <ProductEdit />
            </Suspense>
          }
        />
        <Route
          path="/order"
          element={
            <Suspense fallback={<Loading />}>
              <Order />
            </Suspense>
          }
        />
        <Route
          path="/orders"
          element={
            <Suspense fallback={<Loading />}>
              <Orders />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
