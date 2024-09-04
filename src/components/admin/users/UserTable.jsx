import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserTable.scss";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User",
    profilePicture: "",
  });

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/public/traveler"
        );
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/public/traveler/${editingUser.id}`,
        editingUser
      );
      setUsers(
        users.map((user) => (user.id === editingUser.id ? editingUser : user))
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/public/traveler/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAdd = async () => {
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/public/traveler",
        {
          ...newUser,
          id: newId,
        }
      );
      setUsers([...users, response.data]);
      setNewUser({ name: "", email: "", role: "User", profilePicture: "" });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="user-table">
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="profile-picture"
                />
              </td>
              <td>
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUser?.id === user.id ? (
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser?.id === user.id ? (
                  <select
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingUser?.id === user.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add New User</h3>
      <div className="add-user-form">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <input
          type="text"
          placeholder="Profile Picture URL"
          value={newUser.profilePicture}
          onChange={(e) =>
            setNewUser({ ...newUser, profilePicture: e.target.value })
          }
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default UserTable;
