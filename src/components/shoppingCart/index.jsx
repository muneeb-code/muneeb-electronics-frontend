// src/components/shoppingCart/ShoppingCart.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartState from "../../hooks/cartState"; // Zustand's cart state
import { FaTimes } from "react-icons/fa"; // Import cross icon
import CartItem from "./CartItem"; // Import CartItem

function ShoppingCart({ isVisible, onClose }) {
  const cartItems = useCartState((state) => state.cart); // Zustand's cart items
  const removeFromCart = useCartState((state) => state.removeFromCart); // Zustand's remove function
  const updateQuantity = useCartState((state) => state.updateQuantity); // Zustand's updateQuantity function
  const [selectedItems, setSelectedItems] = useState([]); // Track selected items
  const navigate = useNavigate(); // React router navigation

  // Calculate the total amount of selected items
  const totalAmount = selectedItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (!isVisible) return null;

  // Handle checkbox change
  const handleCheckboxChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id)); // Uncheck
    } else {
      setSelectedItems([...selectedItems, item]); // Check
    }
  };

  // Navigate to OrderPage with selected items
  const handleBuyNow = () => {
    if (selectedItems.length > 0) {
      navigate("/order", { state: { products: selectedItems } });
    }
  };

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 flex flex-col">
      {/* Close Icon */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
      >
        <FaTimes />
      </button>

      <h2 className="text-2xl font-bold mb-4 p-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="p-4">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="overflow-y-auto flex-grow p-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onCheckboxChange={handleCheckboxChange}
                onRemove={removeFromCart}
                onQuantityChange={updateQuantity}
              />
            ))}
          </div>

          {/* Total Amount and Buy Now Button at the Bottom */}
          <div className="border-t p-4 flex justify-between items-center">
            <button
              onClick={handleBuyNow}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              disabled={selectedItems.length === 0} // Disable if no items are selected
            >
              Buy Now
            </button>
            <h3 className="text-xl font-semibold text-right">
              Total: ${totalAmount.toFixed(2)}
            </h3>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
