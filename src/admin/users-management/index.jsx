import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="px-1 bg-gray-100 min-h-screen">
      {/* Fixed Table Header */}
      <div className="sticky top-0 bg-white z-10">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left w-20">ID</th>
              <th className="py-2 px-4 border-b text-left w-64">Full Name</th>
              <th className="py-2 px-4 border-b text-left w-64">Email</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* User List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b w-20">{user.id}</td>
                <td className="py-2 px-4 border-b w-64">{user.fullName}</td>
                <td className="py-2 px-4 border-b w-64">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
