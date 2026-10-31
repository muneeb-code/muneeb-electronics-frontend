import React from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";

const AdminPanelLayout = () => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="pl-56">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanelLayout;
