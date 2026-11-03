// src/hooks/cartState.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartState = create(
  persist(
    (set, get) => ({
      cart: [],
      
      addToCart: (product) => {
        const currentCart = get().cart;
        const productId = product.id || product._id;
        const existingIndex = currentCart.findIndex((item) => (item.id || item._id) === productId);
        
        if (existingIndex > -1) {
          const updatedCart = [...currentCart];
          updatedCart[existingIndex].quantity = (updatedCart[existingIndex].quantity || 1) + 1;
          set({ cart: updatedCart });
        } else {
          set({ cart: [...currentCart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => (item.id || item._id) !== id) });
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            (item.id || item._id) === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "muneeb-cart-storage",
    }
  )
);

export default useCartState;