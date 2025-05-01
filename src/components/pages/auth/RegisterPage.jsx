import { useContext, useState } from "react";
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

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e, role) => {
    e.preventDefault();
    try {
      await register(email, firstname, lastname, password, role);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 300);
    } catch (err) {
      console.log(err);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
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
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
