import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import ApiHelper from "../../Common/apiHelper";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryDialogue from "./CategoryDialogue";
import ErrorMessageAlert from "../../Common/ErrorMessageBox";

export default function ProductCategory() {
  const [rows, setRows] = useState([]);
  const [setUpdate] = useState(false);
  const [error, setError] = useState({ message: "", type: "" });
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    alias: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Product category Name",
      flex: 1,
    },
    {
      field: "alias",
      headerName: "Alias",
      flex: 1,
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
              onClick={(e) => {
                editProductDetails(cell.row);
              }}
            >
              <ModeEditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={(e) => {
                deleteProduct(cell.row._id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
      width: 150,
    },
  ];

  const getProductsCategory = async () => {
    try {
      const result = await ApiHelper.fetchproductCategory();
      const rows = result.data.data;
      setRows(rows);
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

  const editProductDetails = async (data) => {
    try {
      const id = data._id;
      const result = await ApiHelper.productCategoryById(id);
      setCategory(result.data.category);
      setOpen(true);
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

  const deleteProduct = async (id) => {
    try {
      //eslint-disable-next-line
      const result = await ApiHelper.deleteproductCategory(id);
      setError({
        ...error,
        message: error.response.data.message,
        type: "success",
      });
    
      getProductsCategory();
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
    getProductsCategory();
  }, []);
  return (
    <div>
      <div className="row">
        <ErrorMessageAlert error={error} setError={setError}/>

        <div className="col-12 mb-3 d-flex justify-content-between">
          <h2>Manage Products Category</h2>

          <CategoryDialogue
            category={category}
            getProductsCategory={getProductsCategory}
            setUpdate={setUpdate}
            setCategory={setCategory}
            setOpen={setOpen}
            open={open}
            handleClickOpen={handleClickOpen}
          />
        </div>
      </div>

      <Box sx={{ width: "100%", marginTop: "12px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(e) => e._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 99,
              },
            },
          }}
          pageSizeOptions={[99]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}
