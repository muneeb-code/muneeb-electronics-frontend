import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const AuthAdminPanel = () => {
  const Token = localStorage.getItem("admin-login-system");
  const location = useLocation();
  if (!Token) {
    return <Navigate to="/admin/login" state={{ from: location }} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthAdminPanel;
