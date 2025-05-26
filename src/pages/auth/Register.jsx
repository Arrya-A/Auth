import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UseAuth from "./hooks/UseAuth";

const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email().required("email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be atleast 8 characters")
    .matches(/[A-Z]/, "Password should contain atleast one uppercase letter")
    .matches(/[a-z]/, "Password should contain atleast one lowercase letter")
    .matches(/[0-9]/, "Password should contain atleast one number")
    .matches(
      /[!@#$%^&*()_+-=]/,
      "Password should contain atleast one special character"
    ),
});

const Register = () => {
  const navigate = useNavigate();
  const { isUserRegistered, addUser } = UseAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    console.log(data);

    const email = getValues("email");

    const registeredUser = isUserRegistered(email);

    if (registeredUser) {
      alert("Account already exists");
    } else {
      addUser(data);
    }
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "grey",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              p: 5,
            }}
          >
            <Grid container>
              <Stack spacing={2}>
                <Typography variant="h6">Sign Up</Typography>

                <TextField
                  fullWidth
                  size="small"
                  label="Username"
                  variant="outlined"
                  {...register("username")}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />

                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  size="small"
                  color="success"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

                <Button variant="contained" type="submit">
                  Sign Up
                </Button>

                <Typography sx={{ fontSize: "0.75rem" }} variant="h6">
                  Already have an account? <Link to={"/"}>Sign In </Link>
                  here.
                </Typography>

                <Divider sx={{ fontSize: "0.75rem" }}>or</Divider>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Icon icon="flat-color-icons:google" />}
                >
                  Sign up with Google
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Icon icon="logos:facebook" />}
                >
                  Sign up with Facebook
                </Button>
              </Stack>
            </Grid>
          </Box>
        </form>
      </div>
    </>
  );
};

export default Register;
