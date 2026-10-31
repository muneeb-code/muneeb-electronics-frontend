import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCartState from "../../hooks/cartState"; // Zustand cart state

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = useCartState((state) => state.addToCart);
  const isInCart = useCartState((state) => state.isInCart);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:4000/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const inCart = isInCart(product.id);
      setIsProductInCart(inCart);
    }
  }, [product, isInCart]);

  if (!product) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-[500px] rounded-lg shadow-lg"
          />
        </div>

        <div className="flex-1 mt-6 md:mt-0">
          <h1 className="text-4xl font-semibold text-gray-800 mb-2">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-green-600 mb-4">
            ${product.price}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex flex-col md:flex-row md:space-x-4">
            {/* Add to Cart button */}
            <button
              onClick={() => addToCart(product)}
              className={`bg-yellow-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 mb-2 md:mb-0 ${
                isProductInCart ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isProductInCart}
            >
              {isProductInCart ? "Added to Cart" : "Add to Cart"}
            </button>

            {/* Buy Now button redirects to OrderPage with product */}
            <button
              onClick={() =>
                navigate("/order", { state: { products: [product] } })
              }
              className="bg-orange-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
