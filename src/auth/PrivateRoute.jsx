import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
