// src/components/shoppingCart/CartItem.jsx
import React from "react";

const CartItem = ({ item, onCheckboxChange, onRemove, onQuantityChange }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="checkbox"
        checked={item.selected}
        onChange={() => onCheckboxChange(item)}
        className="mr-4"
      />
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover"
      />
      <div>
        <h3 className="text-lg">{item.name}</h3>
        <p className="text-gray-500">
          ${parseFloat(item.price).toFixed(2)} x {item.quantity}
        </p>
      </div>
      <select
        value={item.quantity}
        onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
        className="border p-2 rounded"
      >
        {[...Array(10).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700 ml-2"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
