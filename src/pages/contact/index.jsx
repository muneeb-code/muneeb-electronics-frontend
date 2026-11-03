// src/pages/contact/index.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you! Your message has been sent successfully.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 md:p-12">
        
        {/* Main Header Title */}
        <div className="mb-10 pb-6 border-b border-slate-100">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Get in Touch With Us
          </h1>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Visit our outlet or send us a message. Our team at Muneeb Electronics is always here to assist you.
          </p>
        </div>

        {/* Two Column Layout: Left Store Info, Right Send Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Store Information & Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-orange-500 pl-3">
                Store Information
              </h2>
              
              <div className="space-y-6 text-slate-700">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl font-bold shrink-0 border border-orange-200">
                    📍
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-base">Store Address:</p>
                    <p className="text-sm text-slate-600 mt-0.5">LG 135 Malikabad Shopping Mall, 6th Road Rawalpindi</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl font-bold shrink-0 border border-orange-200">
                    📞
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-base">Phone / WhatsApp:</p>
                    <p className="text-sm text-slate-600 mt-0.5">+92 300 0000000</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl font-bold shrink-0 border border-orange-200">
                    ✉️
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-base">Email Address:</p>
                    <p className="text-sm text-slate-600 mt-0.5">umuneeb531@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours Box */}
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
              <h4 className="font-bold text-orange-800 text-base mb-2">🕒 Working Hours:</h4>
              <p className="text-sm text-orange-700 font-medium">Monday – Saturday: 10:00 AM – 9:00 PM</p>
              <p className="text-xs text-orange-600 mt-1">Sunday: Closed</p>
            </div>
          </div>

          {/* Right Column: Send Us a Message Form (Highlighted with Glow Effect & Orange Border) */}
          <div className="bg-gradient-to-br from-orange-50/50 via-white to-amber-50/30 p-8 rounded-3xl border-2 border-orange-400 shadow-xl shadow-orange-500/10 ring-4 ring-orange-100/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <span>✉️</span> Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Muneeb"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="umuneeb531@gmail.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Phone Number</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92 300 0000000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Your Message</label>
                <textarea 
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm resize-none transition"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-orange-600/30 cursor-pointer text-base mt-2"
              >
                Send Message 🚀
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactUs;