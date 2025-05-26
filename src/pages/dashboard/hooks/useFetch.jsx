import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(url);
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers()
  }, [url]);

  return {users};
  
};

export default useFetch;
