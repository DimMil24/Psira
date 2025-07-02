import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (success) setTimeout(() => navigate("/login"), 1000);
  }, [success, navigate]);

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
      if (!response.ok) {
        setError("Register Error");
        setEmail("");
        setFirstname("");
        setLastname("");
        setPassword("");
        return;
      }
      setSuccess(true);
      setSuccessMessage("Register Successfull. Redirecting...");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const handleSubmit = async (e, role) => {
    e.preventDefault();
    await register(email, firstname, lastname, password, role);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{successMessage}</Alert>}
        <form>
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
            label="FirstName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          <TextField
            label="LastName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
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
            onClick={(e) => handleSubmit(e, "admin")}
          >
            Register Admin
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={(e) => handleSubmit(e, "manager")}
          >
            Register Manager
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={(e) => handleSubmit(e, "developer")}
          >
            Register Developer
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={(e) => handleSubmit(e, "submitter")}
          >
            Register Submitter
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link to={"/login"}>Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
