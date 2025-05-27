import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const index = ({
  open,
  handleClose,
  handleSubmit,
  onSubmit,
  register,
  errors,
  title,
  submitText,
}) => {
  return (
    <>
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
          <DialogTitle>{title}</DialogTitle>
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
              {submitText}
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

export default index;
