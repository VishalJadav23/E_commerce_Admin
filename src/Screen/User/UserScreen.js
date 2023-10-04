import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ApiHelper from "../../Common/apiHelper";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageUser from "./ManageUser";
import ErrorMessageAlert from "../../Common/ErrorMessageBox";

export default function UserScreen() {
  const [error, setError] = useState({ message: "", type: "" });
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const user = {
    firstName: "",
    lastName: "",
    email: "",
    role: "0",
    password: "",
  };
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      // editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 100,
      // editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      // editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      // editable: true,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      // editable: true,
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      renderCell: (cell) => {
        return (
          <>
            <IconButton
              color="primary"
              onClick={() => {
                // setRows(cell.row);
                // editUser(cell.row);
                // setOpen(true);
              }}
            >
              <ModeEditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={(e) => {
                // deleteUser(cell.row._id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
      width: 150,
      editable: true,
    },
  ];

  const [userDetails, setUserDetails] = useState(user);

  let getUser = async () => {
    try {
      const data = await ApiHelper.getUser();
      const users = data.data.user;
      setRows(users);
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

  const editUser = async (data) => {
    setUserDetails(data);
  };

  const deleteUser = async (id) => {
    try {
      //eslint-disable-next-line
      const result = await ApiHelper.deleteUser(id);
      setError({
        ...error,
        message:result.data.message,
        type: "success",
      });
      
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

  useEffect(() => {
    getUser(); //eslint-disable-next-line
  }, []);

  return (
    <div>
      <ManageUser
        getUser={getUser}
        open={open}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
        setOpen={setOpen}
      />
      <div className="row">
        <ErrorMessageAlert error={error} setError={setError} />

        <div className="col-12 mb-3 d-flex justify-content-between">
          <h2>Show and Manage User</h2>
          <Button
            onClick={() => {
              setUserDetails(user);
              setOpen(true);
            }}
          >
            Add User
          </Button>
        </div>
      </div>
      <Box sx={{ height: 400, width: "100%", marginTop: "12px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(e) => e._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[7]}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}
