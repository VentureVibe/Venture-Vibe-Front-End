import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem('idToken');
        //console.log("token", savedToken);
        setToken(savedToken);
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ token, loading, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}
