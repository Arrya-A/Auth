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
import useFetch from "./hooks/useFetch";
import AddUser from "../../components/AddUser";
import EditUser from "../../components/EditUser";
import { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);

  const location = useLocation();
  const username = location.state?.username;
  const { users: fetchedUsers, fetchUsers } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  console.log(users);

  // useEffect(() => {
  //   if (fetchedUsers.length) {
  //     setUsers(fetchedUsers);
  //   }
  // }, [fetchedUsers]);

  const handleAddUser = (newUser) => {
    setUsers((user) => [...user, newUser]);
  };

  const handleUpdateUser = (updatedUser) => {
    // console.log('test');

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
  };

  const handleDelete = (id) => {
    setUsers((user) => user.filter((user) => user.id !== id));
    fetchUsers();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
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
              {users.length > 0 &&
                users.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.address?.city}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.company?.name}</TableCell>
                    <TableCell>
                      {/* <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </Button> */}
                      <EditUser userData={user} onEditUser={handleUpdateUser} />
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
