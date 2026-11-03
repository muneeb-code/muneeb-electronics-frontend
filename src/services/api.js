// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Laravel Backend API URL
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

// Products APIs
export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (productData) => API.post("/products", productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Users & Admins APIs
export const getUsers = () => API.get("/users");
export const createUser = (userData) => API.post("/users", userData); // Naya user/admin create karne ke liye
export const registerUser = (userData) => API.post("/users", userData); // Alias
export const updateUser = (id, userData) => API.put(`/users/${id}`, userData);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Orders APIs
export const getOrders = () => API.get("/orders");
export const createOrder = (orderData) => API.post("/orders", orderData);
export const updateOrder = (id, orderData) => API.put(`/orders/${id}`, orderData);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);

export default API;