// src/components/shoppingCart/CartItem.jsx
import React from "react";

const CartItem = ({ item, onCheckboxChange, onRemove, onQuantityChange }) => {
  return (
    <div className="flex justify-between items-center mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
      <input
        type="checkbox"
        checked={item.selected || false}
        onChange={() => onCheckboxChange(item)}
        className="mr-3 accent-orange-600 cursor-pointer"
      />
      <img
        src={item.image || "/muneebelectronics.jpeg"}
        alt={item.name}
        className="w-14 h-14 object-cover rounded-xl border border-slate-200"
      />
      <div className="flex-1 mx-3">
        <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h3>
        <p className="text-orange-600 font-extrabold text-xs mt-0.5">
          Rs. {parseFloat(item.price).toLocaleString()}
        </p>
      </div>
      <select
        value={item.quantity || 1}
        onChange={(e) => onQuantityChange(item.id || item._id, parseInt(e.target.value))}
        className="border border-slate-300 p-1.5 rounded-xl text-xs bg-white font-medium cursor-pointer"
      >
        {[...Array(10).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button
        onClick={() => onRemove(item.id || item._id)}
        className="text-red-500 hover:text-red-700 ml-3 text-xs font-bold cursor-pointer"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;