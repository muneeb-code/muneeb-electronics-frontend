// src/components/productDetail/index.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../services/api"; 
import useCartState from "../../hooks/cartState"; 
import toast from "react-hot-toast"; 
import { Loader2, ShoppingCart, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const addToCart = useCartState((state) => state.addToCart);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const res = await getProductById(id);
      
      const rawData = res.data;
      let productObj = null;

      if (rawData && rawData.product) {
        productObj = rawData.product;
      } else if (rawData && rawData.data) {
        productObj = rawData.data;
      } else {
        productObj = rawData;
      }

      setProduct(productObj);
    } catch (err) {
      console.error("Error fetching product details:", err);
      toast.error("Product details load karne mein error aaya.");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart successfully! 🛒`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 font-sans">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
          <p className="text-slate-600 font-medium text-sm">Loading details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 font-sans">
        <div className="text-center">
          <span className="text-4xl block mb-2">🔍</span>
          <h3 className="text-lg font-bold text-slate-800">Product not found.</h3>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 font-sans max-w-7xl">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold text-xs cursor-pointer transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </button>

      {/* Modern Edge-to-Edge Layout (No Box Wrapper) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Extra Large Full Size Image */}
        <div className="lg:col-span-7 w-full h-[450px] md:h-[550px] bg-white rounded-3xl overflow-hidden flex items-center justify-center p-4 border border-slate-200/60 shadow-md">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain hover:scale-105 transition duration-500" 
            />
          ) : (
            <div className="text-8xl">⚡</div>
          )}
        </div>

        {/* Right Side: Product Information */}
        <div className="lg:col-span-5 flex flex-col justify-start pt-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
            {product.name}
          </h1>
          
          <div className="text-3xl font-black text-orange-600 mb-6">
            Rs. {Number(product.price || 0).toLocaleString()}
          </div>

          <div className="w-full h-px bg-slate-200 my-4"></div>
          
          {/* Product Description */}
          <div className="mb-8">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              Product Description
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              {product.description || "High quality home appliance from Muneeb Electronics built with durable standards and modern design."}
            </p>
          </div>

          {/* Add to Cart Button */}
          <div className="flex items-center gap-4 pt-4">
            <button 
              onClick={handleAddToCart}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 rounded-2xl transition duration-200 shadow-xl shadow-orange-600/30 active:scale-[0.98] cursor-pointer flex items-center justify-center space-x-3 text-sm"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;