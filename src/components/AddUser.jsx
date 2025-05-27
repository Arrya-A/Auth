import {
  Box,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import ShowAddModal from "../pages/dashboard/dialog";

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
      <ShowAddModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        title="Add User"
        submitText="Add"
      />
    </>
  );
};

export default AddUser;
