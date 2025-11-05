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
  confirmPassword: string;
  name: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [formErrors, setFormErrors] = useState<FormValues>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errors: FormValues = { email: "", password: "", confirmPassword: "", name: "" };
    if (formValues.email === "") {
      errors.email = "Email is required";
    } else if (!/.+@.+\.[A-Za-z]+$/.test(formValues.email)) {
      errors.email = "Invalid email address";
    }
    if (formValues.name === "") {
        errors.name = "Name is required";
    }
    if (formValues.password === "") {
      errors.password = "Password is required";
    }
    if (formValues.confirmPassword === "") {
      errors.confirmPassword = "Confirm Password is required";
    } else if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "Passwords does not match";
    }
    if (errors.email === "" && errors.password === "" && errors.confirmPassword === "" && errors.name === "") {
      setIsLoading(true);
      axios
        .post("http://localhost:5000/users/", {
          email: formValues.email,
          password: formValues.password,
          name: formValues.name,
        }).then(async () => {
            const data = await axios.post("http://localhost:5000/users/login", {
            email: formValues.email,
            password: formValues.password,
          })
            localStorage.setItem("userToken", data.data.userToken);
            message.success("Signed up successfully");
            navigate("/OnboardingQuiz");
          })
        .catch((err) => {
          setIsLoading(false);
          message.error(err.response.data.message || "Error occurred during sign up");
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
            Sign up
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
              label="Name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              sx={{ marginTop: 4 }}
            />
            {formErrors.name !== "" && (
              <Typography sx={{ color: "red" }}>{formErrors.name}</Typography>
            )}
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
             <TextField
              margin="normal"
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
              sx={{ marginTop: 4 }}
            />
            {formErrors.confirmPassword !== "" && (
              <Typography sx={{ color: "red" }}>{formErrors.confirmPassword}</Typography>
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
              Sign up
            </Button>
          </Box>

          <Box sx={{ marginTop: 2, textAlign: "center" }}>
            <Typography sx={{margin: "10px auto 20px"}}variant="body2" color="textSecondary">
              Already have an account?{" "} login to your account
              <ArrowForwardIcon sx={{ fontSize: 16, verticalAlign: "middle" }} />
              <Button>
                <Typography
                  variant="body2"
                  color="primary"
                  onClick={() => navigate("/")}
                  sx={{ textTransform: "none", marginLeft: 0.5 }}
                >
                  Login Page
                </Typography>
              </Button>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Loader>
  );
};

export default SignUpPage;
