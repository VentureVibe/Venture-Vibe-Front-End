import React, { useState, useEffect } from "react";
import "./UserManagement.scss";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    // Fetch all users on component mount
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/admin/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditFormData(user);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/v1/admin/users/${editFormData.id}`,
        editFormData
      );
      setUsers(
        users.map((user) => (user.id === editFormData.id ? editFormData : user))
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>#</th> {/* Serial Number Column */}
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td> {/* Display Serial Number */}
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="edit-form">
          <h2>Edit User</h2>
          <form onSubmit={handleEditSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Role:
              <input
                type="text"
                name="role"
                value={editFormData.role}
                onChange={handleEditChange}
              />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingUser(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
