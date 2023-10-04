import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import ApiHelper from "../../Common/apiHelper";

export default function ManageUser(props) {
  const { open, setOpen, userDetails, setUserDetails, getUser } = props;
  const [error, setError] = useState({ message: "", type: "" });

  const handleClose = () => {
    setOpen(false);
  };

  const addUser = async () => {
    try {
      if (!userDetails.firstName) {
        setError({
          ...error,
          message: "Required field FirstName is empty",
          type: "danger",
        });
        return;
      }
      if (!userDetails.lastName) {
        setError({
          ...error,
          message: "Required field lastName is empty",
          type: "danger",
        });
        return;
      }
      if (userDetails.role === "0") {
        setError({
          ...error,
          message: "Required field role is empty",
          type: "danger",
        });
        return;
      }
      if (!userDetails.password) {
        setError({
          ...error,
          message: "Required field password is empty",
          type: "danger",
        });
        return;
      }
      if (!userDetails.email) {
        setError({
          ...error,
          message: "Required field email is empty",
          type: "danger",
        });
        return;
      }

      const result = await ApiHelper.insertUser(userDetails);
      setError({
        ...error,
        message:result.data.message,
        type: "success",
      });
      getUser();
      setOpen(false);
      if (!result) return;
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError({
          ...error,
          message: error.response.data.message,
          type: "danger",
        });
       
      }
    }
  };

  const updateDetails = async () => {
    try {
      const { _id } = userDetails; //eslint-disable-next-line
      const result = await ApiHelper.updateUser(_id, userDetails);
      setError({
        ...error,
        message:result.data.message,
        type: "success",
      });
      setOpen(false);
      getUser();
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError({
          ...error,
          message: error.response.data.message,
          type: "danger",
        });
       
      }
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {userDetails._id ? "Update user" : "Add user"}
        </DialogTitle>
        <hr className="my-0" />
        <DialogContent>
          <TextField
            autoFocus
            helperText={error.includes("firstName") ? error : ""}
            margin="dense"
            id="firstName"
            value={userDetails.firstName}
            label="first Name"
            type="text"
            error={error.includes === "firstName"}
            onChange={(e) =>
              setUserDetails({ ...userDetails, firstName: e.target.value })
            }
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            value={userDetails.lastName}
            helperText={error.includes("lastName") ? error : ""}
            onChange={(e) =>
              setUserDetails({ ...userDetails, lastName: e.target.value })
            }
            error={error.includes === "lastName"}
            label="Last Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            value={userDetails.email}
            helperText={error.includes("email") ? error : ""}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            error={error.includes === "email"}
            label="E-mail"
            type="email"
            fullWidth
            variant="outlined"
          />

          <FormControl sx={{ marginTop: "10px" }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userDetails.role}
              helperText={error.includes("role") ? error : ""}
              label="Role"
              error={error.includes === "role"}
              margin="dense"
              onChange={(e) =>
                setUserDetails({ ...userDetails, role: e.target.value })
              }
            >
              <MenuItem value={"0"}>--Select Role--</MenuItem>
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"Editor"}>Editor</MenuItem>
              <MenuItem value={"SCO"}>SCO</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            error={error.includes === "password"}
            value={userDetails.password}
            helperText={error.includes("password") ? error : ""}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={userDetails._id ? updateDetails : addUser}>
            {userDetails._id ? "Upadate" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
