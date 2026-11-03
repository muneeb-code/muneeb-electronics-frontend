// src/components/shoppingCart/ShoppingCart.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartState from "../../hooks/cartState"; 
import { FaTimes } from "react-icons/fa"; 
import CartItem from "./CartItem"; 

function ShoppingCart({ isVisible, onClose }) {
  const cartItems = useCartState((state) => state.cart); 
  const removeFromCart = useCartState((state) => state.removeFromCart); 
  const updateQuantity = useCartState((state) => state.updateQuantity); 
  const [selectedItems, setSelectedItems] = useState([]); 
  const navigate = useNavigate(); 

  const totalAmount = selectedItems.reduce((total, item) => {
    return total + (parseFloat(item.price) || 0) * (item.quantity || 1);
  }, 0);

  if (!isVisible) return null;

  const handleCheckboxChange = (item) => {
    const itemId = item.id || item._id;
    if (selectedItems.some((i) => (i.id || i._id) === itemId)) {
      setSelectedItems(selectedItems.filter((i) => (i.id || i._id) !== itemId)); 
    } else {
      setSelectedItems([...selectedItems, item]); 
    }
  };

  const handleBuyNow = () => {
    if (selectedItems.length > 0) {
      onClose();
      navigate("/order", { state: { products: selectedItems } });
    }
  };

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-xl text-slate-500 hover:text-black p-2 cursor-pointer"
      >
        <FaTimes />
      </button>

      <h2 className="text-2xl font-black mb-2 p-4 border-b border-slate-100 text-slate-900">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="p-8 text-center text-slate-500 my-auto">
          <p className="text-4xl mb-2">🛒</p>
          <p className="font-medium text-sm">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="overflow-y-auto flex-grow p-4 space-y-3">
            {cartItems.map((item) => (
              <CartItem
                key={item.id || item._id}
                item={{ ...item, selected: selectedItems.some((i) => (i.id || i._id) === (item.id || item._id)) }}
                onCheckboxChange={handleCheckboxChange}
                onRemove={removeFromCart}
                onQuantityChange={updateQuantity}
              />
            ))}
          </div>

          <div className="border-t border-slate-200 p-4 bg-slate-50 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium text-sm">Total:</span>
              <h3 className="text-xl font-black text-orange-600">
                Rs. {totalAmount.toLocaleString()}
              </h3>
            </div>
            <button
              onClick={handleBuyNow}
              className="bg-orange-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-orange-700 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed w-full cursor-pointer text-xs"
              disabled={selectedItems.length === 0} 
            >
              Proceed to Checkout ({selectedItems.length})
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;