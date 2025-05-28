import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const useFetch = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const { data, status } = await axiosInstance.get("/users");
      if (status === 200) {
        setUsers(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users,fetchUsers };
};

export default useFetch;
