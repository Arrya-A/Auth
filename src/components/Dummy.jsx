import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import AddUser from "../../components/AddUser";

const Home = () => {
  const location = useLocation();
  const username = location.state?.username;

  const { users: fetchedUsers } = useFetch("https://jsonplaceholder.typicode.com/users");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (fetchedUsers.length) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers]);

  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">Welcome {username}</Typography>
      </Box>

      <AddUser onAddUser={handleAddUser} />

      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Userid</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address?.city || "N/A"}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.company?.name || "N/A"}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Home;
