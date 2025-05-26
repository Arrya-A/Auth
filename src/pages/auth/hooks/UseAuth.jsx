import React from "react";
import { useNavigate } from "react-router-dom";

const UseAuth = () => {
  const navigate = useNavigate();
  const getStoredUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
  };
  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const isUserRegistered = (email) => {
    const storedUser = getStoredUsers();
    return storedUser.find((user) => user.email == email);
  };
  const addUser = (data) => {
    const storedUser = getStoredUsers();
    storedUser.push(data);
    saveUsers(storedUser);
    navigate("/");
  };

  const loginUser = ({ email, password }) => {
    const storedUsers = getStoredUsers();

    const matchedUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      navigate("/home", {
        state: {
          username: matchedUser.username,
        },
      });
      return { success: true, matchedUser };
    }
    return { success: false };
  };
  return {
    isUserRegistered,
    addUser,
    loginUser,
  };
};

export default UseAuth;
