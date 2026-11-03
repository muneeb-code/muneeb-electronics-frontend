// src/admin/users-management/index.jsx
import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../../services/api";
import toast from "react-hot-toast";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
  });

  useEffect(() => {
    fetchUsersList();
  }, []);

  const fetchUsersList = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      
      // Safe data extraction for Laravel JSON response ({ success: true, users: [...] })
      const rawData = response.data;
      let userList = [];

      if (Array.isArray(rawData)) {
        userList = rawData;
      } else if (rawData && Array.isArray(rawData.users)) {
        userList = rawData.users;
      } else if (rawData && Array.isArray(rawData.data)) {
        userList = rawData.data;
      }

      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Laravel backend se users load karne mein nakaam rahe.");
      setUsers([]);
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
    setCurrentUserId(null);
    setFormData({ name: "", email: "", password: "", role: "customer" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setIsEditMode(true);
    setCurrentUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // Password blank rakhtay hain edit ke waqt
      role: user.role
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        // Update User in Laravel Backend
        const response = await updateUser(currentUserId, formData);
        const updatedUser = response.data.data || response.data;
        setUsers(users.map((u) => (u.id === currentUserId ? updatedUser : u)));
        toast.success("User successfully update ho gaya! 🎉");
      } else {
        // Create New User in Laravel Backend
        const response = await createUser(formData);
        const newUser = response.data.data || response.data;
        setUsers([newUser, ...users]);
        toast.success("Naya user/admin kamyabi se create ho gaya! 🚀");
      }
      setIsModalOpen(false);
      setFormData({ name: "", email: "", password: "", role: "customer" });
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error(error.response?.data?.message || "Operation failed!");
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Kya aap waqai is user ko delete karna chahte hain?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((u) => u.id !== id));
        toast.success("User successfully remove ho gaya!");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("User delete karne mein error aaya.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-100 font-sans">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium text-sm">Laravel users load ho rahe hain...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-slate-100 min-h-screen font-sans">
      
      {/* Add / Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-900">
                {isEditMode ? "Edit User / Admin" : "Add New User / Admin"}
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
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Muneeb Ur Rehman"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@muneebelectronics.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Password {isEditMode && <span className="text-slate-400 font-normal">(Leave blank to keep unchanged)</span>}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  {...(!isEditMode ? { required: true } : {})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">User Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white font-medium"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
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
                  {isEditMode ? "Save Changes 💾" : "Create User 🚀"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Users Management</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Laravel REST API connected system for Muneeb Electronics.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-2">
            <span className="text-sm">👥</span>
            <span className="text-xs font-bold text-slate-700">Total:</span>
            <span className="bg-orange-100 text-orange-600 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
              {users.length}
            </span>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-orange-600/30 transition flex items-center space-x-2 cursor-pointer"
          >
            <span>+</span>
            <span>Add New User</span>
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
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Created At</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm bg-white divide-y divide-slate-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-slate-400 font-medium">
                    <span className="text-4xl block mb-2">👤</span>
                    Laravel database mein koi user mojood nahi hai.
                  </td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr 
                    key={user.id} 
                    className={`transition-colors duration-150 border-b border-slate-200 ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                    } hover:bg-orange-50/30`}
                  >
                    <td className="py-4 px-6 font-mono font-bold text-xs text-orange-600 whitespace-nowrap align-middle">
                      #{user.id}
                    </td>
                    <td className="py-4 px-6 align-middle">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm shadow-2xs border border-orange-200 shrink-0">
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                          <p className="text-[11px] text-slate-400">Eloquent Record</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-medium text-xs align-middle">
                      {user.email}
                    </td>
                    <td className="py-4 px-6 align-middle whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold border ${
                        user.role === "admin" 
                          ? "bg-purple-50 text-purple-700 border-purple-200" 
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}>
                        {user.role ? user.role.toUpperCase() : "CUSTOMER"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs font-medium whitespace-nowrap align-middle">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap align-middle">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(user)}
                          className="bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
                        >
                          🗑️ Delete
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

export default UserManagement;