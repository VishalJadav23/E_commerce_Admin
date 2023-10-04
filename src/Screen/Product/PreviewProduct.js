import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ApiHelper from "../../Common/apiHelper";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import ErrorMessageAlert from "../../Common/ErrorMessageBox";

export default function DispalyProducts () {
  const navigate = useNavigate();
  const [error, setError] = useState({ message: "", type: "" });
  const [rows, setRows] = useState([]);
  const [update, setUpdate] = useState({});

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Product Name",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
    },
    {
      field: "totalPrice",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      renderCell: (cell) => {
        return (
          <>
            <IconButton color="primary" onClick={(e) => {
              editProductDetails(cell.row);
            }}>
              <ModeEditIcon />
            </IconButton>
            <IconButton color="error" onClick={(e) => {
              deleteProduct(cell.row._id);
            }}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
      width: 150,
      editable: true,
    },
  ];


  const getProducts = async () => {
    try {
      const result = await ApiHelper.getProducts();
      const rows = result.data.products;
      for (let i = 0; i < rows.length; i++) {
        rows[i].category = rows[i].category?.name;
      }
      setRows(rows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [update]);


  const editProductDetails = async (data) => {
    const id = data._id;
    navigate(`/product/edit/${id}`);
  };

  const deleteProduct = async (id) => {
    try {
      const result = await ApiHelper.deleteProduct(id);
      if (result.status === 200) {
        setError({
          ...error,
          message: result.data.message,
          type: "success",
        });
        setUpdate();
      }
    } catch (error) {
      setError({
        ...error,
        message: error.response.data.message,
        type: "danger",
      });
    }
  };
  return (
    <div>
      <div className="row">
      <ErrorMessageAlert error={error} setError={setError}/>

        <div className="col-12 mb-3 d-flex justify-content-between">
          <h2>Show and Manage Products</h2>
          <Button
            onClick={(e) => navigate("/product/add")
            }
          >
            Add Product
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
