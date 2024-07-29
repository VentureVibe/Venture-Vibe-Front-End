import React, { useState } from "react";
import "./UserManagement.scss";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "johndoe@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com", role: "User" },
    { id: 3, name: "Jane Smith", email: "janesmith@example.com", role: "User" },
    { id: 4, name: "Jane Smith", email: "janesmith@example.com", role: "User" },
    { id: 5, name: "Jane Smith", email: "janesmith@example.com", role: "User" },
    { id: 6, name: "Jane Smith", email: "janesmith@example.com", role: "User" },
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditFormData(user);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = users.map((user) =>
      user.id === editFormData.id ? editFormData : user
    );
    setUsers(updatedUsers);
    setEditingUser(null);
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
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
