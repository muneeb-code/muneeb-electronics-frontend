import React from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
function AppLayout() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
