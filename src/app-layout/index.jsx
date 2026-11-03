// src/app-layout/index.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar yahan se hata diya hai kyunki App.jsx mein global laga chuke hain */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;