// src/app-layout/AdminPanel-layout.jsx
import React from "react";
import Sidebar from "../components/sidebar"; // Agar components folder src ke andar app-layout ke barabar mein hai
// Ya agar aik level up jana ho toh: import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";

const AdminPanelLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="ml-56 flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanelLayout;