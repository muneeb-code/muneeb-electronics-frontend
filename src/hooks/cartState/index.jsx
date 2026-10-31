// hooks/cartState.js
import create from "zustand";

const useCartState = create((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const existingItem = get().cart.find((item) => item.id === product.id);
    if (!existingItem) {
      set((state) => ({
        cart: [...state.cart, { ...product, quantity: 1 }],
      }));
    }
  },

  // Fixed: Directly checking if the product is in the cart from the state
  isInCart: (id) => {
    return get().cart.some((item) => item.id === id);
  },

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      ),
    })),
}));

export default useCartState;
