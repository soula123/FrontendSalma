import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import image from "../Auth/bg.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import background from "../../assets/homepage-shape.webm"
import cogoToast from "cogo-toast";
export default function Login() {
  const [email, setEmail] = useState("");
  const [username,setUserName]=useState("");
  const [password, setPassword] = useState("");
  const [token,setToken]=useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login", {
        email,
        password,
      });
      if (response.data.email && response.data.token) {
        // The login was successful
        const { email, token } = response.data;
        cogoToast.success("c bon");
        console.log("welyeeyyy dkhalna");
        navigate("/traitement"); // Replace "/traitement" with the route to your dashboard component
      } else {
        // Invalid credentials or missing data
        setError("Invalid credentials");
        console.log("fama mochkla");
      }      
    } catch (err) {
      console.error(err);
      console.log('fama broblem')
      setError("Something went wrong");
    }
  };
  
  const backgroundImageUrl =
    "https://cdn.neoxam.com/wp-content/uploads/2023/04/homepage-shape.webm";
  return (
    <div style={{ backgroundImage:`url(${image})`, backgroundRepeat: 'no-repeat',backgroundSize:"cover",width:"100%" }}>
      
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width:"100%",
            
            marginLeft:"90%",
            marginTop:"60%",
          }}
        >
          <Typography component="h1" variant="h5" style={{ fontSize:"40px", color: "#08dbba" }}>
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              style={{width:'100%'}}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,height:"50px",fontSize:"20px", backgroundColor: "#08dbba" }}
            >
              Sign In
            </Button>
          
          </Box>
        </Box>
      </Container>
    </div>
  );
}
