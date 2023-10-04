// import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Fragment, useState } from "react";

export default function MultiImgDialogue (props) {
  const { image, selectedImages, setSelectedImages } = props;
  const [open, setOpen] = useState(false);
  const [fullWidth] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Fragment>
      <Button variant="outlined" className="mt-1 w-100" onClick={handleClickOpen}>
        Set Relavent Images
      </Button>
      <Dialog
        style={{ zIndex: "10000" }}
        fullWidth={fullWidth}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <div className="d-flex  justify-content-between  gap-3">
              <div className="">
                <label
                  className=""
                  style={{
                    width: "10rem",
                    height: "10rem",
                    border: "1px solid black",
                    borderRadius: "20px",
                  }}
                >
                  <div className="d-flex  justify-content-center">
                    <AddPhotoAlternateIcon
                      style={{ height: "5rem", width: "5rem" }}
                      className="mt-3"
                    />
                  </div>


                </label>
              </div>

              <div className="image d-flex flex-wrap gap-3 ">
                {/* {image.map((x, index) => { */}
                {image.map((x, index) => {
                  const isSelected = selectedImages ? (selectedImages?.some((selected) => selected._id === x._id)) : "";
                  return (
                    <div key={index}>
                      {x.mimetype === "image" ? (
                        <img
                          src={x.url}
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            border: isSelected ? "2px solid Blue" : "",
                          }}
                          className=" gap-3"
                          alt=""
                          onClick={() => {
                            if (isSelected) {
                              setSelectedImages(selectedImages.filter((selected) => selected._id !== x._id));
                            } else {
                              setSelectedImages([...selectedImages, x]);
                            }
                          }}
                        />
                      ) : (
                        <video
                          src={x.url}
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                          controls
                          onClick={() => {
                            if (isSelected) {
                              setSelectedImages(selectedImages.filter((selected) => selected._id !== x._id));
                            } else {
                              setSelectedImages([...selectedImages, x]);
                            }
                          }}
                        ></video>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => {

            handleClose();
            if (!selectedImages.length > 0) {
              setSelectedImages("");

            }
          }
          }>Close</Button>
          <Button onClick={() => {
            if (selectedImages.length < 0) {
              return alert("Please select Items");

            }
            // setfetureImg(Select);
            setOpen(false);
          }}>Save</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}




