import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    axios
      .post("http://localhost:4000/products", newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ name: "", price: "", description: "", image: "" });
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ ...product });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = () => {
    axios
      .put(`http://localhost:4000/products/${editingProduct.id}`, newProduct)
      .then((response) => {
        setProducts(
          products.map((p) => (p.id === editingProduct.id ? response.data : p))
        );
        setEditingProduct(null);
        setNewProduct({ name: "", price: "", description: "", image: "" });
        setIsModalOpen(false);
        setIsEditMode(false);
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  const handleDeleteProduct = (id) => {
    axios
      .delete(`http://localhost:4000/products/${id}`)
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div className="px-1 bg-gray-100 min-h-screen">
      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">
              {isEditMode ? "Edit Product" : "Add New Product"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="p-2 border rounded-md w-full"
              />
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="p-2 border rounded-md w-full"
              />
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="p-2 border rounded-md w-full"
              />
              <input
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="p-2 border rounded-md w-full"
              />
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditMode ? handleUpdateProduct : handleAddProduct}
                  className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600`}
                >
                  {isEditMode ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Add New Product Button and Table Header */}
      <div className="sticky top-0 bg-white z-10">
        <div className="flex justify-end p-1 border">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left w-20">ID</th>
              <th className="py-2 px-4 border-b text-left w-40">Image</th>
              <th className="py-2 px-4 border-b text-left w-64">Name</th>
              <th className="py-2 px-4 border-b text-left w-32">Price</th>
              <th className="py-2 px-4 border-b text-left w-[600px]">
                Description
              </th>
              <th className="py-2 px-4 border-b text-left w-64">Actions</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Product List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b w-20">{product.id}</td>
                <td className="py-2 px-4 border-b w-40">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
                <td className="py-2 px-4 border-b w-64">{product.name}</td>
                <td className="py-2 px-4 border-b w-32">${product.price}</td>
                <td className="py-2 px-4 border-b w-[600px]">
                  {product.description}
                </td>
                <td className="py-2 px-4 border-b w-64">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsManagement;
