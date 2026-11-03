// src/components/navbar/index.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartState from "../../hooks/cartState";
import ShoppingCart from "../shoppingCart"; // Agar folder name se import karna ho ya path adjust kar lein
import { ShoppingBag, User, LogOut, Shield, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cart = useCartState((state) => state.cart);
  const totalItemsCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  useEffect(() => {
    const checkUserSession = () => {
      const storedUser = localStorage.getItem("login-system") || localStorage.getItem("user-token") || localStorage.getItem("admin-login-system");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser({ name: "User" });
        }
      } else {
        setUser(null);
      }
    };

    checkUserSession();
    window.addEventListener("storage", checkUserSession);
    return () => window.removeEventListener("storage", checkUserSession);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("login-system");
    localStorage.removeItem("token");
    localStorage.removeItem("user-token");
    localStorage.removeItem("admin-login-system");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 font-sans shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-black text-xl border border-orange-200 shadow-2xs">
                ⚡
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900">
                MUNEEB <span className="text-orange-600">Electronics</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-bold text-slate-700 hover:text-orange-600 transition">
                Home
              </Link>
              <Link to="/products" className="text-sm font-bold text-slate-700 hover:text-orange-600 transition">
                Products
              </Link>
              <Link to="/contact" className="text-sm font-bold text-slate-700 hover:text-orange-600 transition">
                Contact Us
              </Link>
            </div>

            {/* Right Actions: Cart & Auth */}
            <div className="flex items-center space-x-4">
              
              {/* Shopping Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer flex items-center justify-center"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* User Authentication Status */}
              {user ? (
                <div className="hidden sm:flex items-center space-x-3 bg-slate-50 py-1.5 px-3 rounded-2xl border border-slate-200">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-xl flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                  </div>
                  <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate">
                    {user.name || user.fullName || "Account"}
                  </span>

                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="p-1.5 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition"
                      title="Admin Panel"
                    >
                      <Shield className="w-4 h-4" />
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition cursor-pointer"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-orange-600 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/sign-up"
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-md shadow-orange-600/30 transition"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-700 hover:text-orange-600"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-5 space-y-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold text-slate-700 py-1"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold text-slate-700 py-1"
            >
              Products
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold text-slate-700 py-1"
            >
              Contact Us
            </Link>
            
            {!user ? (
              <div className="pt-2 border-t border-slate-100 flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 bg-slate-100 text-slate-800 rounded-xl font-bold text-xs"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 bg-orange-600 text-white rounded-xl font-bold text-xs"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left py-2 text-red-600 font-bold text-xs flex items-center gap-2 border-t border-slate-100 pt-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Shopping Cart Drawer */}
      <ShoppingCart isVisible={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;