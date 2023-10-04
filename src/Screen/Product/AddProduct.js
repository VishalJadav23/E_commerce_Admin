import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useEffect, useState } from "react";
import ApiHelper from "../../Common/apiHelper";
import validation from "../../Common/Validation";
import ImageDialogue from "./ImageDialogue";
import MultiImgDialogue from "./Multi_ImgDialogue";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ErrorMessageAlert from "../../Common/ErrorMessageBox";

export default function AddProduct() {
  const [error, setError] = useState({ message: "", type: "" });
  const [image, setImage] = useState([]);
  const [IsSubmited, setIsSubmited] = useState(false);
  const [fetureImage, setfetureImg] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [ProductDetails, setProductDetails] = useState({
    name: "",
    alias: "",
    brand: "",
    image: "",
    description: "",
    releventImg: [],
    totalPrice: 0,
    price: 0,
    category: "",
    discount: 0,
    countInStock: 0,
  });

  const ShowFile = async () => {
    try {
      const result = await ApiHelper.getMedia();
      setImage(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const result = await ApiHelper.fetchproductCategory();
      setCategory(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ShowFile();
    fetchCategory();
  }, []);

  const ProductHadler = async () => {
    try {
      setIsSubmited(true);
      const ValidationResult = validation(ProductDetails, "addProduct");
      if (ValidationResult.length > 0) {
        setError(ValidationResult);
      }
      setIsSubmited(false);

      ProductDetails.image = fetureImage._id;
      ProductDetails.releventImg = selectedImages;
      ProductDetails.totalPrice =
        ProductDetails.price -
        (ProductDetails.price * ProductDetails.discount) / 100;
      //eslint-disable-next-line
      const result = await ApiHelper.createProduct(ProductDetails);
      setError({
        ...error,
        message:result.data.message,
        type: "success",
      });
   
      setProductDetails("");
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
    <>
      <div className="row">
        <ErrorMessageAlert error={error} setError={setError}/>

        <div className="col-12 col-sm-6 col-md-7">
          <h2>Add New Product</h2>
        </div>
        <div className="col-12 col-sm-6 col-md-3 d-flex">
          <Switch />
          <p className="mt-2">Published</p>
        </div>
        <div className="col-12 col-sm-6 col-md-2">
          <Button variant="outlined" onClick={ProductHadler}>
            Add Product
          </Button>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12 col-md-3">
          <p className="fw-bold mb-0">Product Name</p>
          <TextField
            id="product_Name"
            placeholder="Product Name"
            error={error.some((x) => x.key === "name")}
            helperText={error.find((x) => x.key === "name")?.message}
            onChange={(e) => {
              setProductDetails({ ...ProductDetails, name: e.target.value });
              setIsSubmited(true);
              if (IsSubmited) {
                const ValidationResult = validation(
                  { ...ProductDetails, name: e.target.value },
                  "addProduct"
                );
                setError(ValidationResult);
              }
            }}
            className="w-100"
            variant="outlined"
          />
        </div>

        <div className="col-12 col-md-2">
          <p className="fw-bold mb-0">Brand</p>
          <TextField
            id="product_Brand"
            placeholder="Brand"
            error={error.some((x) => x.key === "brand")}
            helperText={error.find((x) => x.key === "brand")?.message}
            onChange={(e) => {
              setProductDetails({ ...ProductDetails, brand: e.target.value });
              setIsSubmited(true);

              if (IsSubmited) {
                const ValidationResult = validation(
                  { ...ProductDetails, brand: e.target.value },
                  "addProduct"
                );
                setError(ValidationResult);
              }
            }}
            className="w-100"
            variant="outlined"
          />
        </div>

        <div className="col-12 col-md-3">
          <p className="fw-bold mb-0">Alias</p>
          <TextField
            id="product_alias"
            placeholder="Alias"
            error={error.some((x) => x.key === "alias")}
            helperText={error.find((x) => x.key === "alias")?.message}
            onChange={(e) => {
              setProductDetails({ ...ProductDetails, alias: e.target.value });
              setIsSubmited(true);

              if (IsSubmited) {
                const ValidationResult = validation(
                  { ...ProductDetails, alias: e.target.value },
                  "addProduct"
                );
                setError(ValidationResult);
              }
            }}
            className="w-100"
            variant="outlined"
          />
        </div>
        <div className="col-12 col-md-4">
          <p className="fw-bold mb-0">Category</p>

          <FormControl>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              style={{ width: "300px" }}
              // fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ProductDetails.category}
              // helperText={error.includes("category") ? error : ""}
              label="Category"
              itemID={(category) => category._id}
              error={error.includes === "category"}
              margin="dense"
              onChange={(e) =>
                setProductDetails({
                  ...ProductDetails,
                  category: e.target.value,
                })
              }
            >
              {category.map((x) => {
                return (
                  <MenuItem id={x._id} value={x._id}>
                    {x.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="container">
        <div className="row mt-3">
          <div className="col-12 col-md-8">
            <p className="fw-bold mb-1">Description</p>
            <Editor
              error={error.some((x) => x.key === "description")}
              helperText={error.find((x) => x.key === "description")?.message}
              // onKeyUp={(content, editor) => {
              //   setProductDetails({
              //     ...ProductDetails,
              //     description: editor.getContent(),
              //   });
              // }}
              onInit={(content, editor) => {
                setProductDetails({
                  ...ProductDetails,
                  description: editor.getContent(),
                });
              }}
              apiKey="xt6nnmvuoxxccns5n0ytenewl0slzrj07917amogch9x45oz"
              init={{
                selector: "textarea",
                height: 500,
                // paste_merge_formats: true,
                // paste_data_images: true,
                mobile: {
                  theme: "mobile",
                  plugins: "autosave lists autolink",
                  toolbar: "undo bold italic styleselect",
                },
                menubar: true,
                plugins: [
                  "print preview paste importcss searchreplace autolink save directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
                ],
                toolbar:
                  "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor code codesample | ltr rtl",
                content_style:
                  "body {font - family:Helvetica,Arial,sans-serif; font-size:14px }",
                images_upload_handler: async (
                  blobInfo,
                  success,
                  failure,
                  _
                ) => {
                  const file = blobInfo.blob();
                  let formdata = new FormData();
                  formdata.append("file", file);
                  const body = formdata;
                  const data = await axios.post(
                    "http://localhost:5000/upload/file",
                    body
                  );
                  if (data.status === 200) {
                    success(data.data.data.path);
                  }
                },
              }}
            />
          </div>

          <div className="col-12 col-md-4">
            <p className="fw-bold mb-1">Upload Media</p>
            <div
              htmlFor="file"
              className="mb-2"
              style={{
                width: "100%",
                height: "180px",
                border: "1px solid gray",
              }}
            >
              {fetureImage._id && (
                <img
                  src={fetureImage.url}
                  alt=""
                  width={"100%"}
                  height={"100%"}
                ></img>
              )}
            </div>

            <ImageDialogue
              fetureImage={fetureImage}
              image={image}
              setfetureImg={setfetureImg}
              setProductDetails={setProductDetails}
              showFile={ShowFile}
            />
            <MultiImgDialogue
              image={image}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
            />

            {/* <ImageDialog Media={Media} FetchMediaHandler={FetchMediaHandler} setFituerImage={setFituerImage} /> */}
            {/* <MultiImgDialog setRelevantImg={setRelevantImg} Media={Media} FetchMediaHandler={FetchMediaHandler} /> */}

            <TextField
              id="product_price"
              className="w-100 mt-3"
              label="Price"
              error={error.some((x) => x.key === "price")}
              type="number"
              helperText={error.find((x) => x.key === "price")?.message}
              onChange={(e) => {
                setProductDetails({
                  ...ProductDetails,
                  price: Number(e.target.value),
                });
                setIsSubmited(true);

                if (IsSubmited) {
                  const ValidationResult = validation(
                    { ...ProductDetails, price: e.target.value },
                    "addProduct"
                  );
                  setError(ValidationResult);
                }
              }}
            />
            <TextField
              id="product_Discount"
              className="w-100 mt-3"
              label="Discount"
              type="text"
              inputMode="numeric"
              inputProps={{ min: 0, max: 2 }}
              onChange={(e) => {
                setProductDetails({
                  ...ProductDetails,
                  discount: Number(e.target.value),
                });
              }}
              variant="outlined"
            />
            <TextField
              id="product_countInStock"
              error={error.some((x) => x.key === "countInStock")}
              helperText={error.find((x) => x.key === "countInStock")?.message}
              className="w-100 mt-3"
              inputMode="numeric"
              label="countInstock"
              onChange={(e) => {
                setProductDetails({
                  ...ProductDetails,
                  countInStock: Number(e.target.value),
                });
                setIsSubmited(true);

                if (IsSubmited) {
                  const ValidationResult = validation(
                    { ...ProductDetails, countInStock: e.target.value },
                    "addProduct"
                  );
                  setError(ValidationResult);
                }
              }}
              variant="outlined"
            />
          </div>
        </div>
      </div>
    </>
  );
}
