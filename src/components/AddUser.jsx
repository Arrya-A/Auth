import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
const userSchema = yup.object().shape({
  name: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.object().shape({
    city: yup.string().required("City is required"),
  }),
  phone: yup.string().required("Phone is required"),
  company: yup.object().shape({
    name: yup.string().required("Company name is required"),
  }),
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AddUser = ({ onAddUser }) => {
  const [open, setOpen] = useState(false);
  // Dialog
  const handleClickOpen = () => {
    // console.log("Button clicked");

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      address: {
        city: "",
      },
      phone: "",
      company: {
        name: "",
      },
    },
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async ({ name, email, address, phone, company }) => {
    //destructure the data and use diectly
    const newUser = {
      name,
      email,
      address: { city: address.city },
      phone,
      company: { name: company.name },
    };
    console.log(newUser);

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newUser
      );
      onAddUser({ id: Date.now(), ...newUser });
      setOpen(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box>
        <Button
          variant="contained"
          color="success"
          sx={{ float: "right" }}
          startIcon={<Icon icon="line-md:plus" />}
          onClick={handleClickOpen}
        >
          Add User
        </Button>
      </Box>

      {/* Dialog  */}
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{"Add User Details"}</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                {...register("address.city")}
                error={!!errors.address?.city}
                helperText={errors.address?.city?.message}
              />
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <TextField
                fullWidth
                label="Company"
                variant="outlined"
                {...register("company.name")}
                error={!!errors.company?.name}
                helperText={errors.company?.name?.message}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="success">
              Add
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddUser;
