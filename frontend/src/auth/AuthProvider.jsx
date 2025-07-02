import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const validateToken = async () => {
      if (!token) return;
      try {
        const response = await fetch("http://localhost:8080/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const decoded = jwtDecode(token);
          setUser({
            userId: decoded.userId,
            name: decoded.sub,
            fullName: decoded.fullName,
            role: decoded.role,
          });
        } else {
          logout();
        }
      } catch (error) {
        logout();
        console.log(error);
      }
    };

    validateToken();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
