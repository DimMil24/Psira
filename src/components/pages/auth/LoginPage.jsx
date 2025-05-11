import { useState, useContext, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../auth/AuthProvider";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) navigate("/");
  }, [success, navigate]);

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
        setError("Invalid Credentials");
        setEmail("");
        setPassword("");
        return;
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Do not have an account? <a href="/register">Register</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
