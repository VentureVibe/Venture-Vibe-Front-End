import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/authContext";
import { GetUser } from "../../services/user/GetUser";

const withRole = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const { token, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        if (!loading) {
          if (!token) {
            navigate("/", { replace: true });
          } else {
            try {
              // Fetch user data asynchronously
              const user = await GetUser();
              const userRole = user.role;
              if (!allowedRoles.includes(userRole)) {
                navigate(-1); // Go back to the previous page
              } else {
                setAuthChecked(true); // Set authChecked to true if the user is authorized
              }
            } catch (error) {
              console.error("Error fetching user data:", error);
              navigate("/", { replace: true });
            }
          }
        }
      };

      checkAuth();
    }, [loading, token, navigate, allowedRoles]);

    if (loading || !authChecked) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withRole;
