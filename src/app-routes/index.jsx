import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../app-layout";

import Home from "../pages/home";

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
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />{" "}
          <Route path="/order" element={<OrderPage />} />{" "}
          {/* Product Listing */}
          <Route path="/product/:id" element={<ProductDetail />} />{" "}
          {/* Product Detail */}
          <Route path="/sign-up" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AuthAdminLogin />}>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        <Route element={<AuthAdminPanel />}>
          <Route path="/admin" element={<AdminPanelLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route
              path="/admin/products-management"
              element={<ProductsManagement />}
            />
            <Route
              path="/admin/orders-management"
              element={<OrdersManagement />}
            />
            <Route
              path="/admin/users-management"
              element={<UsersManagement />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
