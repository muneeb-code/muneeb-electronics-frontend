// src/pages/home/index.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import ProductGrid from "../products";

const Home = () => {
  const navigate = useNavigate();

  // Categories with distinct icons and custom background tints
  const categories = [
    { name: "Smart Home", icon: "🏠", bg: "bg-amber-50", border: "hover:border-amber-500" },
    { name: "Laptops & PCs", icon: "💻", bg: "bg-orange-50", border: "hover:border-orange-500" },
    { name: "Audio & Sound", icon: "🎧", bg: "bg-yellow-50", border: "hover:border-yellow-500" },
    { name: "Kitchen Gadgets", icon: "🧊", bg: "bg-amber-50", border: "hover:border-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Hero Banner Section */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white py-16 px-6 mb-12 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl mb-8 md:mb-0">
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30 uppercase tracking-wider">
              Mega Sale 2026
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-4 tracking-tight leading-tight">
              Best Electronics & Smart Gadgets Store
            </h1>
            <p className="text-orange-100 text-lg mb-8">
              Shop the latest electronics, smart home devices, and premium accessories with fast delivery and amazing discounts.
            </p>
            <button 
              onClick={() => navigate("/products")}
              className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-3.5 rounded-xl shadow-lg transition-all duration-200"
            >
              Shop Now
            </button>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-sm text-center">
              <span className="text-7xl">⚡</span>
              <h3 className="text-xl font-bold mt-4">Special Offers</h3>
              <p className="text-orange-100 text-sm mt-1">Huge discounts on top brands</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Improved Popular Categories Section */}
      <div className="container mx-auto px-6 mb-16">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Popular Categories</h2>
            <p className="text-sm text-slate-500 mt-0.5">Explore our top-selling electronics departments</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              onClick={() => navigate("/products")}
              className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl ${cat.border} transition-all duration-300 cursor-pointer text-center group flex flex-col items-center justify-center`}
            >
              <div className={`w-16 h-16 rounded-2xl ${cat.bg} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-inner`}>
                {cat.icon}
              </div>
              <h4 className="font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                {cat.name}
              </h4>
              <span className="text-xs text-slate-400 mt-1">Browse Items →</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Featured Products Section */}
      <div className="container mx-auto px-6 pb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
          <button 
            onClick={() => navigate("/products")}
            className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
          >
            View All →
          </button>
        </div>
        
        <ProductGrid />
      </div>
    </div>
  );
};

export default Home;