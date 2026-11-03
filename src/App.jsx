// src/App.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./app-routes";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  const location = useLocation();
  
  // Check karein ke kya current route admin panel ka hai ya nahi
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      <Toaster />
      
      {/* Navbar sirf website wale pages par dikhega, admin par nahi */}
      {!isAdminRoute && <Navbar />}

      {/* Main Content */}
      <main className="flex-grow">
        <AppRoutes />
      </main>

      {/* Footer sirf website wale pages par dikhega, admin par nahi */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;