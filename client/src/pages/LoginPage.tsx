import { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; 
interface FormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormValues>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errors: FormValues = { email: "", password: "" };
    if (formValues.email === "") {
      errors.email = "Email is required";
    } else if (!/.+@.+\.[A-Za-z]+$/.test(formValues.email)) {
      errors.email = "Invalid email address";
    }
    if (formValues.password === "") {
      errors.password = "Password is required";
    }
    if (errors.email === "" && errors.password === "") {
      setIsLoading(true);
      axios
        .post("http://localhost:5000/users/login", {
          email: formValues.email,
          password: formValues.password,
        })
        .then(async (data) => {
          localStorage.setItem("userToken", data.data.userToken);
          setIsLoading(false);
          const decodedToken = JSON.parse(atob(data.data.userToken.split(".")[1]));
          message.success("Logged in successfully");
          const user = await axios.get("http://localhost:5000/users/email?email="+decodedToken.email);
          const{userPrefrence}=user.data;
          userPrefrence
            ? navigate("/myDashboard")
            : navigate("/OnboardingQuiz");
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("error",err);
          message.error("Email or password are incorrect");
        });
    }
    setFormErrors(errors);
  };

  return (
    <Loader isLoading={isLoading}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1.5px solid black",
            borderRadius: "10px",
          }}
        >
          <Typography component="h1" variant="h4" sx={{ marginTop: 2 }}>
            MyCryptoAdvisor
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 2, width: "70%" }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              sx={{ marginTop: 4 }}
            />
            {formErrors.email !== "" && (
              <Typography sx={{ color: "red" }}>{formErrors.email}</Typography>
            )}
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              sx={{ marginTop: 4 }}
            />
            {formErrors.password !== "" && (
              <Typography sx={{ color: "red" }}>{formErrors.password}</Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                width: "30%",
                margin: "20px auto 20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Login
            </Button>
          </Box>

          <Box sx={{ marginTop: 2, textAlign: "center" }}>
            <Typography sx={{margin: "10px auto 20px"}}variant="body2" color="textSecondary">
              First time?{" "} sign up for free
              <ArrowForwardIcon sx={{ fontSize: 16, verticalAlign: "middle" }} />
              <Button>
                <Typography
                  variant="body2"
                  color="primary"
                  onClick={() => navigate("/signup")}
                  sx={{ textTransform: "none", marginLeft: 0.5 }}
                >
                  Sign Up
                </Typography>
              </Button>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Loader>
  );
};

export default LoginPage;
