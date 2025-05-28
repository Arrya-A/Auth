import ShowEditModal from "../pages/dashboard/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import axiosInstance from "../utils/axiosInstance";

const userSchema = yup.object().shape({
  name: yup.string().required("Username is required"),
  email: yup.string().email().required("Email is required"),
  address: yup.object({
    city: yup.string().required("City is required"),
  }),
  phone: yup.string().required("Phone is required"),
  company: yup.object({
    name: yup.string().required("Company name is required"),
  }),
});

const EditUser = ({ onEditUser, userData }) => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpen = () => {
    // console.log("Button clicked");

    setOpenEdit(true);
  };
  const handleClose = () => {
    setOpenEdit(false);
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: userData || {
      name: "",
      email: "",
      address: { city: "" },
      phone: "",
      company: { name: "" },
    },
  });

  useEffect(() => {
    reset(userData);
  }, [userData, reset]);

  const onSubmit = async (data) => {
    const updatedUser = {
      ...userData,
      ...data,
      address: { city: data.address.city },
      company: { name: data.company.name },
    };

    try {
      await axiosInstance.put(`users/${userData.id}`, updatedUser);
      onEditUser(updatedUser);
      handleClose();
      reset(updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box>
        <Button variant="contained" color="warning" onClick={handleClickOpen}>
          Edit
        </Button>
      </Box>

      {/* Dialog  */}
      <ShowEditModal
        open={openEdit}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        title="Edit User"
        submitText="Edit"
      />
    </>
  );
};

export default EditUser;
