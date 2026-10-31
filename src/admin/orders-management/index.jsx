import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    fullName: "",
    products: [{ name: "", quantity: 0 }],
    totalAmount: "",
    orderDate: "",
    status: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setNewOrder({ ...order });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleUpdateOrder = () => {
    axios
      .put(`http://localhost:4000/orders/${editingOrder.id}`, newOrder)
      .then((response) => {
        setOrders(
          orders.map((o) => (o.id === editingOrder.id ? response.data : o))
        );
        setEditingOrder(null);
        setNewOrder({
          fullName: "",
          products: [{ name: "", quantity: 0 }],
          totalAmount: "",
          orderDate: "",
          status: "",
        });
        setIsModalOpen(false);
        setIsEditMode(false);
      })
      .catch((error) => console.error("Error updating order:", error));
  };

  const handleDeleteOrder = (id) => {
    axios
      .delete(`http://localhost:4000/orders/${id}`)
      .then(() => {
        setOrders(orders.filter((o) => o.id !== id));
      })
      .catch((error) => console.error("Error deleting order:", error));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        {/* Add/Edit Order Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
              <h2 className="text-xl font-semibold mb-4">
                {isEditMode ? "Edit Order" : "Add New Order"}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="fullName"
                  value={newOrder.fullName}
                  onChange={handleInputChange}
                  placeholder="Customer Name"
                  className="p-2 border rounded-md w-full"
                />
                <input
                  type="text"
                  name="products[0].name"
                  value={newOrder.products[0].name}
                  onChange={handleInputChange}
                  placeholder="Product Name"
                  className="p-2 border rounded-md w-full"
                />
                <input
                  type="number"
                  name="products[0].quantity"
                  value={newOrder.products[0].quantity}
                  onChange={handleInputChange}
                  placeholder="Quantity"
                  className="p-2 border rounded-md w-full"
                />
                <input
                  type="number"
                  name="totalAmount"
                  value={newOrder.totalAmount}
                  onChange={handleInputChange}
                  placeholder="Total Amount"
                  className="p-2 border rounded-md w-full"
                />
                <input
                  type="date"
                  name="orderDate"
                  value={newOrder.orderDate}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md w-full"
                />
                <input
                  type="text"
                  name="status"
                  value={newOrder.status}
                  onChange={handleInputChange}
                  placeholder="Order Status"
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
                    onClick={isEditMode ? handleUpdateOrder : null}
                    className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600`}
                  >
                    {isEditMode ? "Update Order" : "Add Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fixed Add New Order Button */}
        <div className="sticky top-0 bg-white z-10 p-4 border-b">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Add Order
          </button>
        </div>

        {/* Table with Sticky Header */}
        <div className="overflow-y-auto max-h-[80vh]">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                <th className="py-2 px-4 border-b text-left w-20">Order ID</th>
                <th className="py-2 px-4 border-b text-left w-40">Customer Name</th>
                <th className="py-2 px-4 border-b text-left w-64">Product Name</th>
                <th className="py-2 px-4 border-b text-left w-32">Quantity</th>
                <th className="py-2 px-4 border-b text-left w-32">Total Amount</th>
                <th className="py-2 px-4 border-b text-left w-32">Order Date</th>
                <th className="py-2 px-4 border-b text-left w-32">Status</th>
                <th className="py-2 px-4 border-b text-left w-64">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b w-20">{order.id}</td>
                  <td className="py-2 px-4 border-b w-40">{order.fullName}</td>
                  <td className="py-2 px-4 border-b w-64">{order.products[0]?.name}</td>
                  <td className="py-2 px-4 border-b w-32">{order.products[0]?.quantity}</td>
                  <td className="py-2 px-4 border-b w-32">${order.totalAmount}</td>
                  <td className="py-2 px-4 border-b w-32">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b w-32">{order.status}</td>
                  <td className="py-2 px-4 border-b w-64">
                    <button
                      onClick={() => handleEditOrder(order)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
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
    </div>
  );
};

export default OrderManagement;
