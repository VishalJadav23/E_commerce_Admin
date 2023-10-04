import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import ApiHelper from "../../Common/apiHelper";
import { Fragment, useState } from "react";

export default function CategoryDialogue (props) {
    const [fullWidth] = useState(true);
    const { category, setCategory, handleClickOpen, setOpen, open, getProductsCategory } = props;
    const addCategoryDetails = async () => {
        try { //eslint-disable-next-line
            const result = await ApiHelper.addproductCategory(category);
            setOpen(false);
            getProductsCategory();
            setCategory("");


        } catch (error) {
            console.log(error);
        }
    };
    const updateCategoryDetails = async () => {
        try {
            const id = category._id; //eslint-disable-next-line
            const result = await ApiHelper.updateproductCategory(id, category);
            setOpen(false);
            getProductsCategory();
            setCategory("");

        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setCategory("");

    };

    return (
        <Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Category
            </Button>
            <Dialog
                fullWidth={fullWidth}
                // maxWidth={"md"}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add Category Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={category.name}
                            label="Title"
                            type="text"
                            onChange={(e) =>
                                setCategory({ ...category, name: e.target.value })
                            }
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="alias"
                            value={category.alias}
                            label="Alias"
                            type="text"
                            onChange={(e) =>
                                setCategory({ ...category, alias: e.target.value })
                            }
                            fullWidth
                            variant="outlined"
                        />
                    </DialogContentText>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            m: "auto",
                            width: "fit-content",
                        }}
                    ></Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={category._id ? updateCategoryDetails : addCategoryDetails}> {category._id ? "Update" : "Submit"} </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
