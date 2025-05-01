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

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (error) {
      console.error("Login failedhmm", error);
    }
  };

  const register = async (email, firstname, lastname, password, role) => {
    try {
      const response = await fetch(
        "http://localhost:8080/auth/register/" + role,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            firstName: firstname,
            lastName: lastname,
            password: password,
          }),
        }
      );
      const data = await response.status;
      console.log(data);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
