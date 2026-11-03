// src/components/sidebar/index.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("admin-login-system");
    navigate("/admin/login");
  };

  return (
    <div className="w-56 fixed left-0 h-screen border-r bg-gradient-to-r from-blue-500 to-blue-700 flex flex-col justify-between shadow-md">
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
          
          {/* Dashboard */}
          <Link to="/admin">
            <li className="hover:translate-y-[-2px] duration-[0.5s] hover:bg-orange-600 mx-3 my-3 p-2 rounded cursor-pointer text-white bg-green-400 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Dashboard</span>
            </li>
          </Link>

          {/* Products Management */}
          <Link to="/admin/products-management">
            <li className="hover:translate-y-[-2px] duration-[0.5s] hover:bg-orange-600 mx-3 my-3 p-2 rounded cursor-pointer text-white bg-green-400 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Products</span>
            </li>
          </Link>

          {/* Orders Management */}
          <Link to="/admin/orders-management">
            <li className="hover:translate-y-[-2px] duration-[0.5s] hover:bg-orange-600 mx-3 my-3 p-2 rounded cursor-pointer text-white bg-green-400 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span>Orders</span>
            </li>
          </Link>

          {/* Users Management */}
          <Link to="/admin/users-management">
            <li className="hover:translate-y-[-2px] duration-[0.5s] hover:bg-orange-600 mx-3 my-3 p-2 rounded cursor-pointer text-white bg-green-400 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Users</span>
            </li>
          </Link>
        </ul>

        {/* Logout Button with Icon */}
        <ul className="mb-2">
          <li
            className="hover:translate-y-[-2px] duration-[0.5s] hover:bg-orange-600 mx-3 my-2 p-2 rounded cursor-pointer text-white text-center bg-green-400 flex items-center justify-center space-x-2"
            onClick={handleLogout}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;