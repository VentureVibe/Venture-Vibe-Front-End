import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { GetUser } from "../../services/user/GetUser";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await GetUser();
        setUser(userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-details">
      {/*<i className="fa-regular fa-bell"></i>*/}
      <h4>{user?.email}</h4>
      <img src={user?.profileImageUrl} alt="Profile" />
    </div>
  );
};

export default Profile;
