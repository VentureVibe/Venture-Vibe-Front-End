import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; 
import { useAuth } from "../../context/authContext";

const withRole = (WrappedComponent, allowedRoles) => {
    return (props) => {
        const { token, loading } = useAuth();
        //console.log("withRole", token);

        if (loading) {
            return <div>Loading...</div>;
        }

        if (!token) {
            return <Navigate to="/" />;
        }

        const decodedToken = jwtDecode(token);
        const userRole = decodedToken['custom:role'];

        if (allowedRoles.includes(userRole)) {
            return <WrappedComponent {...props} />;
        } else {
            return <Navigate to="/not-authorized" />;
        }
    }
}

export default withRole;
