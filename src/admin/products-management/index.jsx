import React, { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../services/api";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Edit, Trash2, Package } from "lucide-react";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchProductsList();
  }, []);

  const fetchProductsList = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      const rawData = response.data;
      let productList = [];

      if (Array.isArray(rawData)) {
        productList = rawData;
      } else if (rawData && Array.isArray(rawData.products)) {
        productList = rawData.products;
      } else if (rawData && Array.isArray(rawData.data)) {
        productList = rawData.data;
      }

      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Products load karne mein nakaam rahe.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setCurrentProductId(null);
    setFormData({ name: "", price: "", description: "", image: "" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setIsEditMode(true);
    setCurrentProductId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || "",
      image: product.image || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        const response = await updateProduct(currentProductId, formData);
        const updated = response.data.data || response.data.product || response.data;
        setProducts(products.map((p) => (p.id === currentProductId ? updated : p)));
        toast.success("Product successfully update ho gaya! 🎉");
      } else {
        const response = await createProduct(formData);
        const created = response.data.data || response.data.product || response.data;
        setProducts([created, ...products]);
        toast.success("Naya product kamyabi se add ho gaya! 🚀");
      }
      setIsModalOpen(false);
      setFormData({ name: "", price: "", description: "", image: "" });
      fetchProductsList();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(error.response?.data?.message || "Operation failed!");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Kya aap waqai is product ko delete karna chahte hain?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
        toast.success("Product successfully delete ho gaya!");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Product delete karne mein error aaya.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-100 font-sans">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
          <p className="text-slate-600 font-medium text-sm">Products load ho rahe hain...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-slate-100 min-h-screen font-sans">
      
      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-900">
                {isEditMode ? "Edit Product" : "Add New Product"}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Haier Microwave Oven"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Price (Rs.)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g. 25000"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/product.jpg"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product details..."
                  rows="3"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-xs transition shadow-md shadow-orange-600/30 cursor-pointer"
                >
                  {isEditMode ? "Save Changes 💾" : "Add Product 🚀"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Products Management</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Manage inventory and store items for Muneeb Electronics.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-2">
            <span className="text-sm">📦</span>
            <span className="text-xs font-bold text-slate-700">Total:</span>
            <span className="bg-orange-100 text-orange-600 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
              {products.length}
            </span>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-orange-600/30 transition flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-slate-200/70 text-slate-700 font-extrabold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6 w-20">ID</th>
                <th className="py-4 px-6">Image</th>
                <th className="py-4 px-6">Product Name</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm bg-white divide-y divide-slate-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-slate-400 font-medium">
                    <Package className="w-12 h-12 mx-auto mb-2 opacity-40" />
                    Laravel database mein koi product mojood nahi hai.
                  </td>
                </tr>
              ) : (
                products.map((product, idx) => (
                  <tr 
                    key={product.id} 
                    className={`transition-colors duration-150 border-b border-slate-200 ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                    } hover:bg-orange-50/30`}
                  >
                    <td className="py-4 px-6 font-mono font-bold text-xs text-orange-600 whitespace-nowrap align-middle">
                      #{product.id}
                    </td>
                    <td className="py-4 px-6 align-middle">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded-xl border border-slate-200 shadow-2xs" 
                        />
                      ) : (
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-xs font-bold border border-orange-200">
                          ⚡
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900 align-middle">
                      {product.name}
                    </td>
                    <td className="py-4 px-6 text-orange-600 font-extrabold text-xs whitespace-nowrap align-middle">
                      Rs. {Number(product.price).toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs font-medium align-middle max-w-xs truncate">
                      {product.description || "No description provided."}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap align-middle">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ProductsManagement;