// src/components/productGrid/index.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/api";
import useCartState from "../../hooks/cartState";
import { toast } from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const addToCart = useCartState((state) => state.addToCart);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await getProducts();
        
        // Safe extraction for Laravel JSON response
        const rawData = response.data;
        let productList = [];

        if (Array.isArray(rawData)) {
          productList = rawData;
        } else if (rawData && Array.isArray(rawData.products)) {
          productList = rawData.products;
        } else if (rawData && Array.isArray(rawData.data)) {
          productList = rawData.data;
        }

        setProducts(productList);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) return <p className="text-center py-8 text-red-500 font-medium">Error fetching products: {error.message}</p>;

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our Featured Products</h2>
        <p className="mt-2 text-slate-500 text-xs font-medium">Explore the latest electronics and home appliances at the best prices.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id || product._id}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            onClick={() => handleProductClick(product.id || product._id)}
          >
            <div className="relative overflow-hidden bg-slate-50 h-52 flex items-center justify-center border-b border-slate-100">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="text-4xl">⚡</div>
              )}
            </div>
            <div className="p-5 flex flex-col flex-grow justify-between">
              <h3 className="text-base font-bold text-slate-900 mb-3 line-clamp-1">{product.name}</h3>
              
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-lg font-black text-orange-600">
                  Rs. {parseFloat(product.price || 0).toLocaleString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                    toast.success(`${product.name} added to cart! 🛒`);
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white p-2.5 rounded-xl transition shadow-md shadow-orange-600/30 cursor-pointer flex items-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;