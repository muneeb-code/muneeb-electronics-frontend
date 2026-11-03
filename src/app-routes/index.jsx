// src/app-routes/index.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../app-layout";

import Home from "../pages/home";
import ContactUs from "../pages/contact/index.jsx";

import AuthAdminPanel from "../admin/auth-admin-Panel";
import AuthAdminLogin from "../admin/auth-admin-login";
import AdminPanelLayout from "../app-layout/AdminPanel-layout";
import ProductsManagement from "../admin/products-management";
import OrdersManagement from "../admin/orders-management";
import UsersManagement from "../admin/users-management";
import Dashboard from "../admin/admin-dashboard";
import AdminLogin from "../admin/admin-login";
import ProductList from "../pages/products";
import Register from "../pages/sign-up";
import Login from "../pages/login";
import ProductDetail from "../components/productDetail";
import OrderPage from "../pages/order";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/order" element={<OrderPage />} />
        
        {/* Product Detail Routes (Dono support karne ke liye handle kar diye hain) */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        <Route path="/sign-up" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<AuthAdminLogin />}>
        <Route path="/admin/login" element={<AdminLogin />} />
      </Route>

      <Route element={<AuthAdminPanel />}>
        <Route path="/admin" element={<AdminPanelLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route
            path="products-management"
            element={<ProductsManagement />}
          />
          <Route
            path="orders-management"
            element={<OrdersManagement />}
          />
          <Route
            path="users-management"
            element={<UsersManagement />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;