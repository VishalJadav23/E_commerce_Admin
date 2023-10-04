import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ApiHelper from "../../Common/apiHelper";

export default function ImageDialogue(props) {
  const { image, showFile, setfetureImg, fetureImage } = props;
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [Select, setSelect] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    setSelect(fetureImage); //eslint-disable-next-line
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const uploadMedia = async (file) => {
    try {
      const form = new FormData();
      form.append("file", file);
      await ApiHelper.uploadMedia(form);
      showFile();
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        className="mt-1 w-100"
        onClick={handleClickOpen}
      >
        set Feture Image
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

                  <h5 className="ms-4 mt-2">Add Images</h5>
                  <input
                    type="file"
                    name="Image"
                    id=""
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => uploadMedia(e.target.files[0])}
                  />
                </label>
              </div>

              <div className="image d-flex flex-wrap gap-3 ">
                {image.map((x, index) => {
                  return (
                    <div key={index}>
                      {x.mimetype === "image" ? (
                        <img
                          src={x.url}
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            border:
                              Select._id === x._id ? " 2px solid Blue" : "",
                          }}
                          className=" gap-3"
                          alt=""
                          onClick={() => {
                            if (Select._id !== x._id) {
                              setSelect(x);
                            } else {
                              setSelect({});
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
          <Button
            onClick={(e) => {
              handleClose();
              if (!Select._id) {
                setfetureImg({});
              }
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              if (!Select._id) {
                return alert("Please select Items");
              }
              // setProductDetails({ ...ProductDetails, fetureImg: Select._id});
              setfetureImg(Select);
              setOpen(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
