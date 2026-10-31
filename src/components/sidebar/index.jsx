import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("admin-login-system");
    navigate("/login");
  };

  return (
    <div className="w-56 fixed left-0 h-screen border-r bg-gradient-to-r from-blue-500 to-blue-700 flex flex-col justify-between">
      {/* Admin Panel heading and profile image */}
      <div className="flex flex-col items-center mt-4">
        <img
          src="https://cdn-icons-png.freepik.com/512/9703/9703596.png"
          alt="Admin Profile"
          className="w-24 h-24 rounded-full border-2 border-white mb-2"
        />
        <h1 className="text-white text-2xl font-semibold">Admin Panel</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col justify-between h-full">
        <ul className="mt-6">
          <Link to="/admin">
            <li className="hover:translate-y-[-2px] duration-[0.5s] hover:bg-red-500  mx-3 my-4 p-2 rounded cursor-pointer text-white bg-green-400">
              Dashboard
            </li>
          </Link>
          <Link to="/admin/products-management">
            <li className="hover:translate-y-[-2px] duration-[0.5s] hover:bg-red-500 mx-3 my-4 p-2 rounded cursor-pointer text-white bg-green-400">
              Products Management
            </li>
          </Link>
          <Link to="/admin/users-management">
            <li className="hover:translate-y-[-2px] duration-[0.5s] hover:bg-red-500 mx-3 my-4 p-2 rounded cursor-pointer text-white bg-green-400">
              Users Management
            </li>
          </Link>
          <Link to="/admin/orders-management">
            <li className="hover:translate-y-[-2px] duration-[0.5s] hover:bg-red-500 mx-3 my-4 p-2 rounded cursor-pointer text-white bg-green-400">
              Orders Management
            </li>
          </Link>
        </ul>

        {/* Logout Button */}
        <ul className="mb-2">
          <Link to="">
            <li
              className="hover:translate-y-[-2px] duration-[0.5s] hover:bg-red-500 mx-3 my-2 p-2 rounded cursor-pointer text-white text-center bg-green-400"
              onClick={handleLogout}
            >
              Logout
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
