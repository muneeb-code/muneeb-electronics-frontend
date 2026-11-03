// src/components/footer/index.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* 1. Brand Logo - Thora sa right side shift kiya gaya hai */}
        <div className="space-y-4 md:col-span-1 flex flex-col items-start md:pl-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500 shadow-2xl bg-black flex items-center justify-center">
            <img 
              src="/muneebelectronics.jpeg" 
              alt="Muneeb Electronics Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Your ultimate destination for next-gen electronics, home appliances, and smart gadgets with unmatched quality.
          </p>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-4 border-l-4 border-orange-500 pl-3">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-orange-400 transition-colors">Products</Link></li>
            <li><Link to="/category" className="hover:text-orange-400 transition-colors">Categories</Link></li>
            <li><Link to="/order" className="hover:text-orange-400 transition-colors">Orders</Link></li>
          </ul>
        </div>

        {/* 3. Customer Care */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-4 border-l-4 border-orange-500 pl-3">Customer Care</h4>
          <ul className="space-y-2.5 text-sm">
            <li><span className="hover:text-orange-400 cursor-pointer transition-colors">Contact Us</span></li>
            <li><span className="hover:text-orange-400 cursor-pointer transition-colors">Privacy Policy</span></li>
            <li><span className="hover:text-orange-400 cursor-pointer transition-colors">Terms & Conditions</span></li>
            <li><span className="hover:text-orange-400 cursor-pointer transition-colors">Order Tracking</span></li>
          </ul>
        </div>

        {/* 4. Store Location & Contact */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-4 border-l-4 border-orange-500 pl-3">Visit Our Store</h4>
          <p className="text-sm text-slate-400 mb-3 flex items-start space-x-2">
            <span className="text-orange-500 text-lg">📍</span>
            <span>LG 135 Malikabad Shopping Mall, 6th Road Rawalpindi</span>
          </p>
          <p className="text-sm text-slate-400 mb-2 flex items-center space-x-2">
            <span className="text-orange-500">📞</span>
            <span>+92 300 0000000</span>
          </p>
          <p className="text-sm text-slate-400 flex items-center space-x-2">
            <span className="text-orange-500">✉️</span>
            <span>umuneeb531@gmail.com</span>
          </p>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-800 pt-6 mt-8 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Muneeb Electronics (LG 135). All Rights Reserved. Designed with excellence.</p>
      </div>
    </footer>
  );
};

export default Footer;