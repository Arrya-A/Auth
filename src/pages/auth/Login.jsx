import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import UseAuth from "./hooks/UseAuth";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const { loginUser } = UseAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    const email = getValues("email");
    const password = getValues("password");

    const { success } = loginUser({ email, password });
    if (success) {
      alert("Login successful");
    } else {
      alert("invalid credentials");
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
                <Typography variant="h6">Sign In</Typography>

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

                <FormControlLabel
                  control={<Checkbox />}
                  label="Remember me"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.75rem",
                    },
                  }}
                />

                <Button variant="contained" type="submit">
                  Sign In
                </Button>

                <Typography variant="h6" sx={{ fontSize: "0.75rem" }}>
                  <Link to={"/"}>Forgot Password</Link>
                </Typography>

                <Typography variant="h6" fontSize={"0.75rem"}>
                  Don't have an account? <Link to={"/register"}>Sign Up </Link>
                  here.
                </Typography>

                <Divider sx={{ fontSize: "0.75rem" }}>or</Divider>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Icon icon="flat-color-icons:google" />}
                >
                  Sign in with Google
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Icon icon="logos:facebook" />}
                >
                  Sign in with Facebook
                </Button>
              </Stack>
            </Grid>
          </Box>
        </form>
      </div>
    </>
  );
};

export default Login;
