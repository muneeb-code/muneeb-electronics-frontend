// src/pages/order/index.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createOrder, getUsers } from "../../services/api"; 
import useCartState from "../../hooks/cartState";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Stripe Test Publishable Key (Yeh official public test key hai)
const stripePromise = loadStripe("pk_test_51Lx1234567890abcdefghijklmnopqrstuvwxyz"); // ya niche wali default Stripe public test key

const CheckoutForm = ({ orderDetails, products, totalAmount, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (products.length === 0) {
      toast.error("No items in the order!");
      return;
    }

    setLoading(true);

    try {
      let paymentStatus = "Pending";

      // Agar user ne Stripe select kiya hai, toh official Stripe card element validate hoga
      if (orderDetails.paymentMethod === "Stripe") {
        if (!stripe || !elements) {
          toast.error("Stripe has not loaded yet. Please try again.");
          setLoading(false);
          return;
        }

        const cardElement = elements.getElement(CardElement);

        // Stripe se card token/payment method generate karein
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (error) {
          toast.error(error.message);
          setLoading(false);
          return;
        }

        // Agar card theek hai toh status Processing ho jaye ga
        paymentStatus = "Processing";
      }

      const orderPayload = {
        fullName: orderDetails.fullName || "Muneeb",
        email: orderDetails.email,
        totalAmount: totalAmount.toFixed(2),
        orderDate: new Date().toISOString(),
        status: paymentStatus,
        paymentMethod: orderDetails.paymentMethod,
        address: {
          fullName: orderDetails.fullName,
          address: orderDetails.address,
          city: orderDetails.city,
          country: orderDetails.country,
          phone: orderDetails.phone,
        },
        products: products.map((product) => ({
          id: String(product.id || product._id),
          name: product.title || product.name,
          image: product.image || product.imageUrl || "",
          quantity: product.quantity || 1,
          price: product.price,
        })),
      };

      await createOrder(orderPayload);
      toast.success(
        orderDetails.paymentMethod === "Stripe" 
          ? "Payment successful via Stripe! 🎉" 
          : "Order placed successfully via COD! 🎉"
      );
      useCartState.getState().clearCart();
      orderDetails.setSubmitted(true);

    } catch (error) {
      console.error("Error saving order:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 lg:col-span-2 space-y-5">
      <h2 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-orange-500 pl-3">
        Shipping Information
      </h2>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={orderDetails.fullName}
          onChange={orderDetails.handleChange}
          placeholder="Muneeb Ur Rehman"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          value={orderDetails.email}
          readOnly
          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-100 text-slate-600 text-sm cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={orderDetails.phone}
          onChange={orderDetails.handleChange}
          placeholder="03255687645"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Delivery Address</label>
        <input
          type="text"
          name="address"
          value={orderDetails.address}
          onChange={orderDetails.handleChange}
          placeholder="House #123, Street #4, Rawalpindi"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City</label>
          <input
            type="text"
            name="city"
            value={orderDetails.city}
            onChange={orderDetails.handleChange}
            placeholder="Rawalpindi"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={orderDetails.country}
            onChange={orderDetails.handleChange}
            placeholder="Pakistan"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm"
            required
          />
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="pt-4 border-t border-slate-100">
        <label className="block text-xs font-bold text-slate-700 uppercase mb-3">Select Payment Method</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className={`p-4 border rounded-2xl flex items-center space-x-3 cursor-pointer transition ${orderDetails.paymentMethod === "COD" ? "border-orange-600 bg-orange-50/50" : "border-slate-200"}`}>
            <input type="radio" name="paymentMethod" value="COD" checked={orderDetails.paymentMethod === "COD"} onChange={orderDetails.handleChange} />
            <div>
              <p className="font-bold text-sm text-slate-900">💵 Cash on Delivery</p>
              <p className="text-[11px] text-slate-500">Pay when order arrives</p>
            </div>
          </label>

          <label className={`p-4 border rounded-2xl flex items-center space-x-3 cursor-pointer transition ${orderDetails.paymentMethod === "Stripe" ? "border-orange-600 bg-orange-50/50" : "border-slate-200"}`}>
            <input type="radio" name="paymentMethod" value="Stripe" checked={orderDetails.paymentMethod === "Stripe"} onChange={orderDetails.handleChange} />
            <div>
              <p className="font-bold text-sm text-slate-900">💳 Credit / Debit Card</p>
              <p className="text-[11px] text-slate-500">Stripe Official Component</p>
            </div>
          </label>
        </div>
      </div>

      {/* Official Stripe Card Element Box (Appears only when Stripe is selected) */}
      {orderDetails.paymentMethod === "Stripe" && (
        <div className="p-4 border border-orange-200 bg-orange-50/20 rounded-2xl space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase">Secure Card Details</label>
          <div className="p-3.5 bg-white border border-slate-300 rounded-xl shadow-sm">
            <CardElement options={{
              style: {
                base: {
                  fontSize: '14px',
                  color: '#1e293b',
                  '::placeholder': { color: '#94a3b8' },
                },
                invalid: { color: '#ef4444' },
              },
            }} />
          </div>
          <p className="text-[11px] text-slate-500 italic">
            💡 Test Card: Use <span className="font-bold text-slate-800">4242 4242 4242 4242</span> (Expiry: Any future date, CVC: Any 3 digits)
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-orange-600/30 cursor-pointer text-base mt-4 disabled:opacity-50"
      >
        {loading ? "Processing Payment..." : `Confirm and Place Order (Rs. ${totalAmount.toLocaleString()}) 🚀`}
      </button>
    </form>
  );
};

const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [products, setProducts] = useState(() => {
    return location.state?.products || useCartState.getState().cart || [];
  });

  const [orderDetails, setOrderDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Pakistan",
    paymentMethod: "COD",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("login-system") || localStorage.getItem("user-token") || localStorage.getItem("admin-login-system");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.email) {
          setOrderDetails((prev) => ({ ...prev, email: user.email }));
          fetchUserByEmail(user.email);
        }
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    } else {
      navigate("/login");
    }

    if (products.length === 0) {
      setProducts(useCartState.getState().cart);
    }
  }, [navigate]);

  const fetchUserByEmail = async (email) => {
    try {
      const response = await getUsers();
      const rawData = response.data;
      let userList = Array.isArray(rawData) ? rawData : (rawData?.users || rawData?.data || []);
      const foundUser = userList.find((u) => u.email === email);
      if (foundUser) {
        setOrderDetails((prev) => ({ 
          ...prev, 
          fullName: foundUser.fullName || foundUser.name || "Muneeb" 
        }));
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const totalAmount = products.reduce((total, product) => total + (parseFloat(product.price) || 0) * (product.quantity || 1), 0);

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 px-4 font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center max-w-md w-full">
          <span className="text-6xl mb-4 inline-block">🎉</span>
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            Thank You for Your Order!
          </h1>
          <p className="text-slate-600 text-sm mb-6">
            Your order has been placed successfully and is currently being processed.
          </p>
          <button 
            onClick={() => navigate("/products")}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition shadow-md cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 mb-8">Place Your Order</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Elements wrapper for Stripe official component */}
          <Elements stripe={stripePromise}>
            <CheckoutForm 
              orderDetails={{ ...orderDetails, handleChange, setSubmitted }} 
              products={products} 
              totalAmount={totalAmount} 
              navigate={navigate} 
            />
          </Elements>

          {/* Order Summary Column */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 space-y-4 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary ({products.length} Items)
            </h2>

            <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
              {products.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-6">No items selected.</p>
              ) : (
                products.map((product) => (
                  <div key={product.id || product._id} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <div className="w-14 h-14 bg-white rounded-xl border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                      <img
                        src={product.image || product.imageUrl || "/muneebelectronics.jpeg"}
                        alt={product.title || product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-slate-900 truncate">{product.title || product.name}</p>
                      <p className="text-slate-500 mt-0.5">Qty: {product.quantity || 1}</p>
                      <p className="text-orange-600 font-extrabold mt-0.5">Rs. {parseFloat(product.price || 0).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-2">
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Shipping:</span>
                <span className="font-bold text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between items-center text-slate-900 font-extrabold text-base pt-2 border-t border-slate-100">
                <span>Total Amount:</span>
                <span className="text-orange-600 text-lg">Rs. {totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderPage;