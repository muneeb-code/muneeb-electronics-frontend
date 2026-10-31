import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCart from "../shoppingCart"; // Adjust path if necessary
import useCartState from "../../hooks/cartState"; // Zustand cart state
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartItems = useCartState((state) => state.cart); // Zustand's cart state

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("login-system");
    navigate("/login");
  };

  return (
    <div className="z-10 flex justify-between items-center px-10 w-full h-20 bg-[aliceblue] border">
      <div>
        <h1 className="flex h-20 items-center text-[30px] font-semibold">Easy Shopping</h1>
      </div>
      <ul className="flex font-serif text-md items-center gap-10">
        <Link to="/">
          <li className="py-[1px] px-[2px] rounded cursor-pointer text-black">
            Home
          </li>
        </Link>
        <Link to="/products">
          <li className="py-[1px] px-[2px] rounded cursor-pointer text-black">
            Products
          </li>
        </Link>
        {/* Category Dropdown */}
        <li className="relative">
          <button
            onClick={toggleDropdown}
            className="py-[1px] px-[2px] rounded cursor-pointer text-black"
          >
            Category
          </button>
          {isDropdownOpen && (
            <ul className="absolute top-full left-0 mt-2 w-40 bg-white border rounded shadow-lg">
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/category/phones">Phones</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/category/laptops">Laptops</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/category/tablets">Tablets</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/category/headphones">Headphones</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/category/smartwatches">Smartwatches</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>

      {/* Cart/Basket Icon */}
      <ul className="flex justify-center items-center gap-10">
        <button onClick={toggleCart} className="relative">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/shopping-cart.png"
            alt="Cart"
            className="w-8 h-8 cursor-pointer"
          />
          {cartItems.length > 0 && (
            <span className="absolute -top-0 -right-0 text-white bg-red-500 w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
              {cartItems.length}
            </span>
          )}
        </button>
        {/* <Link to="/login">
          <li className="px-4 py-2 hover:bg-gray-200">Login/Signup</li>
        </Link> */}
        <Link to="">
          <li
            className=" bg-orange-500 hover:bg-orange-600  text-sm py-[4px] px-2 rounded cursor-pointer text-white text-center "
            onClick={handleLogout}
          >
            Logout
          </li>
        </Link>
      </ul>

      {/* Shopping Cart Summary */}
      <ShoppingCart isVisible={isCartVisible} onClose={toggleCart} />
    </div>
  );
}

export default Navbar;

