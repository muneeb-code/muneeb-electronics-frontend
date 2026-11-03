// src/admin/orders-management/index.jsx
import React, { useState, useEffect } from "react";
import { getOrders, createOrder, updateOrder, deleteOrder } from "../../services/api";
import toast from "react-hot-toast";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    fullName: "",
    products: [{ name: "", quantity: 1, price: 0 }],
    totalAmount: "",
    orderDate: "",
    status: "Pending",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null); // Full products popup view ke liye

  useEffect(() => {
    fetchOrdersList();
  }, []);

  const fetchOrdersList = async () => {
    try {
      const response = await getOrders();
      const orderData = Array.isArray(response.data) ? response.data : response.data.orders || [];
      setOrders(orderData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("products[0].")) {
      const field = name.split(".")[1];
      const updatedProducts = [...newOrder.products];
      updatedProducts[0] = { ...updatedProducts[0], [field]: value };
      setNewOrder({ ...newOrder, products: updatedProducts });
    } else {
      setNewOrder({ ...newOrder, [name]: value });
    }
  };

  const handleAddOrder = () => {
    const orderData = {
      ...newOrder,
      orderDate: new Date().toISOString(),
    };
    createOrder(orderData)
      .then(() => {
        toast.success("Order added successfully!");
        resetForm();
        fetchOrdersList(); // <-- Fresh data sync
      })
      .catch((error) => {
        console.error("Error adding order:", error);
        toast.error("Failed to add order.");
      });
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setNewOrder({ 
      fullName: order.fullName || "",
      products: order.products && order.products.length > 0 ? order.products : [{ name: "", quantity: 1, price: 0 }],
      totalAmount: order.totalAmount || "",
      orderDate: order.orderDate || "",
      status: order.status || "Pending",
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleUpdateOrder = () => {
    updateOrder(editingOrder.id, newOrder)
      .then(() => {
        toast.success("Order updated successfully!");
        resetForm();
        fetchOrdersList(); // <-- Fresh data sync after update
      })
      .catch((error) => {
        console.error("Error updating order:", error);
        toast.error("Failed to update order.");
      });
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrder(id)
        .then(() => {
          setOrders(orders.filter((o) => o.id !== id));
          toast.success("Order deleted successfully!");
          fetchOrdersList(); // <-- Fresh data sync
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
          toast.error("Failed to delete order.");
        });
    }
  };

  const resetForm = () => {
    setEditingOrder(null);
    setNewOrder({
      fullName: "",
      products: [{ name: "", quantity: 1, price: 0 }],
      totalAmount: "",
      orderDate: "",
      status: "Pending",
    });
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  return (
    <div className="p-6 md:p-10 bg-slate-100 min-h-screen font-sans">
      
      {/* Add/Edit Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-xl border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-900">
                {isEditMode ? "Edit Order Details" : "Add New Order"}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Customer Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={newOrder.fullName}
                  onChange={handleInputChange}
                  placeholder="Muneeb Ur Rehman"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Product Name</label>
                <input
                  type="text"
                  name="products[0].name"
                  value={newOrder.products[0]?.name || ""}
                  onChange={handleInputChange}
                  placeholder="Electric Kettle"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Quantity</label>
                  <input
                    type="number"
                    name="products[0].quantity"
                    value={newOrder.products[0]?.quantity || 1}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Total Amount (Rs.)</label>
                  <input
                    type="number"
                    name="totalAmount"
                    value={newOrder.totalAmount}
                    onChange={handleInputChange}
                    placeholder="15000"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status</label>
                <select
                  name="status"
                  value={newOrder.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white font-medium cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditMode ? handleUpdateOrder : handleAddOrder}
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-xs transition shadow-md shadow-orange-600/30 cursor-pointer"
                >
                  {isEditMode ? "Save Changes" : "Create Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Products View Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-slate-100">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-lg font-black text-slate-900">
                Order #{selectedOrderDetails.id} Products
              </h3>
              <button 
                onClick={() => setSelectedOrderDetails(null)}
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {selectedOrderDetails.products?.map((p, i) => (
                <div key={i} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <img src={p.image || "/muneebelectronics.jpeg"} alt={p.name} className="w-12 h-12 object-contain bg-white rounded-xl border p-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm truncate">{p.name || p.title}</p>
                    <p className="text-xs text-slate-500">Qty: {p.quantity || 1} | <span className="text-orange-600 font-bold">Rs. {Number(p.price || 0).toLocaleString()}</span></p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setSelectedOrderDetails(null)}
              className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Orders Management</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Manage and fulfill customer orders placed at Muneeb Electronics.</p>
        </div>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditMode(false);
            setNewOrder({
              fullName: "",
              products: [{ name: "", quantity: 1, price: 0 }],
              totalAmount: "",
              orderDate: "",
              status: "Pending",
            });
          }}
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-orange-600/30 transition flex items-center space-x-2 cursor-pointer"
        >
          <span>+</span>
          <span>Add Manual Order</span>
        </button>
      </div>

      {/* Compact & Clean Table Container */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-slate-200/70 text-slate-700 font-extrabold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Customer Details</th>
                <th className="py-4 px-6">Ordered Products</th>
                <th className="py-4 px-6">Total Amount</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm bg-white">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16 text-slate-400 font-medium">
                    <span className="text-4xl block mb-2">📦</span>
                    No orders found in the database.
                  </td>
                </tr>
              ) : (
                orders.map((order, idx) => {
                  const firstProduct = order.products?.[0];
                  const totalProductsCount = order.products?.length || 0;

                  return (
                    <tr 
                      key={order.id} 
                      className={`transition-colors duration-150 border-b border-slate-200 ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      } hover:bg-orange-50/40`}
                    >
                      {/* Order ID */}
                      <td className="py-4 px-6 font-mono font-bold text-xs text-orange-600 whitespace-nowrap align-middle">
                        #{order.id}
                      </td>

                      {/* Customer Info */}
                      <td className="py-4 px-6 align-middle">
                        <p className="font-bold text-slate-900 text-sm">{order.fullName || order.address?.fullName || "Valued Customer"}</p>
                        <p className="text-xs text-slate-500 mt-0.5">📞 {order.address?.phone || order.email || "No contact"}</p>
                        <p className="text-xs text-slate-400 mt-0.5">📍 {order.address?.address || order.address?.city || "Rawalpindi"}</p>
                      </td>

                      {/* Compact Ordered Products Preview */}
                      <td className="py-4 px-6 align-middle">
                        <div className="flex items-center space-x-3">
                          {firstProduct?.image ? (
                            <img src={firstProduct.image} alt={firstProduct.name} className="w-10 h-10 object-contain rounded-xl bg-slate-50 border border-slate-200 p-1 shrink-0" />
                          ) : (
                            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-bold text-xs shrink-0">
                              ⚡
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 text-xs truncate max-w-[180px]">
                              {firstProduct?.name || firstProduct?.title || "Product"}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Qty: {firstProduct?.quantity || 1} | <span className="font-bold text-orange-600">Rs. {Number(firstProduct?.price || 0).toLocaleString()}</span>
                            </p>
                            {totalProductsCount > 1 && (
                              <button 
                                onClick={() => setSelectedOrderDetails(order)}
                                className="text-[11px] font-bold text-orange-600 hover:underline mt-1 inline-block cursor-pointer"
                              >
                                + {totalProductsCount - 1} more item(s) (View All)
                              </button>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Total Amount */}
                      <td className="py-4 px-6 whitespace-nowrap align-middle">
                        <span className="font-black text-slate-900 text-base">
                          Rs. {Number(order.totalAmount || 0).toLocaleString()}
                        </span>
                      </td>

                      {/* Order Date */}
                      <td className="py-4 px-6 text-slate-600 text-xs font-semibold whitespace-nowrap align-middle">
                        {order.orderDate ? new Date(order.orderDate).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6 whitespace-nowrap align-middle">
                        <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold border ${
                          order.status === "Completed" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                            : order.status === "Cancelled"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            order.status === "Completed" ? "bg-emerald-500" : order.status === "Cancelled" ? "bg-red-500" : "bg-amber-500"
                          }`}></span>
                          {order.status || "Pending"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap align-middle">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditOrder(order)}
                            className="bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
                            title="Edit Order"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
                            title="Delete Order"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default OrderManagement;