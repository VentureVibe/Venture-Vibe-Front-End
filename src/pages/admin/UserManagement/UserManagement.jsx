import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserManagement.scss";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
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

  // Handle delete functionality
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/admin/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId)); // Remove user from state
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle edit button click
  const handleEdit = (user) => {
    setEditingUser(user); // Set the user to be edited
    setEditFormData(user); // Populate form with existing user data
    setIsModalOpen(true); // Open modal
  };

  // Handle form input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value }); // Update form data state
  };

  // Handle form submission for editing user details
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/public/travelers/${editFormData.id}`, // Update endpoint
        editFormData
      );
      setUsers(
        users.map((user) =>
          user.id === editFormData.id ? response.data : user
        )
      ); // Update user in the table
      setIsModalOpen(false); // Close modal after successful update
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle canceling the edit operation
  const handleCancelEdit = () => {
    setIsModalOpen(false); // Close modal
    setEditingUser(null); // Reset editing user state
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {/* <button
                    className="edit-button"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button> */}
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

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <form className="popup" onSubmit={handleEditSubmit}>
              <label className="namelabel">
                <span>Name:</span>
                <input
                  className="nametext"
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  required
                />
              </label>
              <label className="namelabel">
                <span>Email:</span>
                <input
                  className="nametext"
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  required
                />
              </label>
              <label className="namelabel">
                <span>Role:</span>
                <input
                  className="nametext"
                  type="text"
                  name="role"
                  value={editFormData.role}
                  onChange={handleEditChange}
                  required
                />
              </label>
              <div className="modal-actions">
                <button className="savebtn" type="submit">
                  Save
                </button>
                <button
                  className="cancelbtn"
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
