import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useCartState from "../../hooks/cartState"; // Zustand cart state

const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState(location.state?.products || []);
  const [orderDetails, setOrderDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("login-system");
    if (userData) {
      const user = JSON.parse(userData);
      setOrderDetails((prev) => ({ ...prev, email: user.email }));
      fetchUserByEmail(user.email);
    } else {
      navigate("/login");
    }

    // Check for products from the cart if none were passed
    if (products.length === 0) {
      const cartProducts = useCartState.getState().cart;
      setProducts(cartProducts);
    }
  }, [navigate, products.length]);

  const fetchUserByEmail = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/users?email=${email}`
      );
      if (response.data.length > 0) {
        const user = response.data[0];
        setOrderDetails((prev) => ({ ...prev, fullName: user.fullName }));
      }
    } catch (error) {
      console.error("Error fetching user by email:", error);
    }
  };

  const saveOrder = async () => {
    if (products.length === 0) return;

    try {
      const order = {
        userId: "1",
        fullName: orderDetails.fullName,
        email: orderDetails.email,
        products: products.map((product) => ({
          id: product.id,
          name: product.name,
          image: product.image,
          quantity: 1,
          price: product.price,
        })),
        totalAmount: products
          .reduce(
            (total, product) => total + (parseFloat(product.price) || 0),
            0
          )
          .toFixed(2),
        orderDate: new Date().toISOString(),
        status: "Pending",
        address: {
          fullName: orderDetails.fullName,
          address: orderDetails.address,
          city: orderDetails.city,
          country: orderDetails.country,
          phone: orderDetails.phone,
        },
      };

      await axios.post("http://localhost:4000/orders", order);
      setSubmitted(true);
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveOrder();
  };

  const totalAmount = products
    .reduce((total, product) => total + (parseFloat(product.price) || 0), 0)
    .toFixed(2);

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Thank You for Your Order!
        </h1>
        <p className="text-lg text-center text-gray-600">
          Your order has been placed successfully. You will receive an email
          confirmation shortly.
        </p>

        {/* Grid layout for user information and order summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Left Side: User Information */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">
              Customer Information
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <span className="font-medium text-gray-800">Name:</span>{" "}
                {orderDetails.fullName}
              </p>
              <p>
                <span className="font-medium text-gray-800">Email:</span>{" "}
                {orderDetails.email}
              </p>
              <p>
                <span className="font-medium text-gray-800">Address:</span>{" "}
                {orderDetails.address}
              </p>
              <p>
                <span className="font-medium text-gray-800">City:</span>{" "}
                {orderDetails.city}
              </p>
              <p>
                <span className="font-medium text-gray-800">Country:</span>{" "}
                {orderDetails.country}
              </p>
              <p>
                <span className="font-medium text-gray-800">Phone:</span>{" "}
                {orderDetails.phone}
              </p>
            </div>
          </div>

          {/* Right Side: Product Details and Total */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">
              Order Summary
            </h2>

            {/* Product List */}
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center pb-4 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded border border-gray-300"
                  />
                  <div className="ml-4">
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-gray-600">
                      Price: ${parseFloat(product.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Amount */}
            <div className="mt-2">
              <p className="text-xl font-bold text-gray-800">
                Total: ${totalAmount}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-2xl font-bold mb-6">Place Your Order</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md md:col-span-2"
        >
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={orderDetails.fullName}
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={orderDetails.email}
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={orderDetails.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={orderDetails.address}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={orderDetails.city}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={orderDetails.country}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Place Order
          </button>
        </form>

        {products.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {products.map((product) => (
              <div key={product.id} className="flex mb-4 items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <p>
                    <strong>Product:</strong> {product.name}
                  </p>
                  <p>
                    <strong>Price:</strong> $
                    {parseFloat(product.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <p className="font-bold text-lg">Total: ${totalAmount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
