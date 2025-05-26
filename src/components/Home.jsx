import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const username = location.state?.username;

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Welcome {username}</Typography>
      </Box>
    </>
  );
};

export default Home;
