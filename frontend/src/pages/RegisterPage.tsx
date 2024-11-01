import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { register } from "../api/api";
import Alert from "@mui/material/Alert";

function RegisterPage() {
  const initailState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initailState);
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const response = await register(formData);

    if (!response.success) {
      setError(response.error);
      return;
    }
    console.log(response.data);
  };

  useEffect(() => {
    // Clear the message after 4 seconds
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          mt: 4,
          mb: 4,
          height: "calc(100vh - 128px)",
        }}
      >
        <Typography variant="h5">Register New Account</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            value={formData.firstName}
            label="Fisrt Name"
            name="firstName"
          />
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            value={formData.lastName}
            label="Last Name"
            name="lastName"
          />
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            value={formData.email}
            label="Email"
            name="email"
          />
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            value={formData.password}
            label="Password"
            name="password"
            type="password"
          />
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Register
          </Button>
        </Box>
        <div style={{ height: "1px", marginTop: "20px" }}>
          {error && (
            <Alert
              sx={{ minWidth: { xs: "300px", md: "400px" } }}
              severity="error"
            >
              {error}
            </Alert>
          )}
        </div>
      </Box>
    </Container>
  );
}

export default RegisterPage;
