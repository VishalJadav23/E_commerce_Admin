import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useEffect, useState } from "react";
import ApiHelper from "../../Common/apiHelper";
import validation from "../../Common/Validation";
import ImageDialogue from "./ImageDialogue";
import MultiImgDialogue from "./Multi_ImgDialogue";
import { useParams } from "react-router-dom";
import ErrorMessageAlert from "../../Common/ErrorMessageBox";

export default function EditProductDetails() {
  const [error, setError] = useState({ message: "", type: "" });
  const [image, setImage] = useState([]);
  const [IsSubmited, setIsSubmited] = useState(false);
  const [fetureImage, setfetureImg] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [ProductDetails, setProductDetails] = useState({});
  const { id } = useParams();

  const ShowFile = async () => {
    try {
      const result = await ApiHelper.getMedia();
      setImage(result.data.data);
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

  const defaultCategory = () => {
    try {
      let i = 0;
      while (i < category.length) {
        if (category[i]._id === ProductDetails.category) {
          setProductDetails({ ...ProductDetails, category: category[i]._id });
        }
        i++;
      }
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

  const getProductDetailsById = async () => {
    const result = await ApiHelper.getProductById(id);
    setProductDetails(result.data.product);
    setfetureImg(result.data.product.image);
    setSelectedImages(result.data.product.releventImg);
  };

  const fetchCategory = async () => {
    try {
      const result = await ApiHelper.fetchproductCategory();
      setCategory(result.data.data);
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
    ShowFile();
    fetchCategory();
    getProductDetailsById(); //eslint-disable-next-line
    defaultCategory(); //eslint-disable-next-line
  }, []);

  const updateProductDetails = async () => {
    try {
      setIsSubmited(true);
      const ValidationResult = validation(ProductDetails, "addProduct");
      if (ValidationResult.length > 0) {
        setError(ValidationResult);
      }
      setIsSubmited(false);

      ProductDetails.image = fetureImage._id;
      ProductDetails.releventImg = selectedImages;
      const id = ProductDetails._id;
      ProductDetails.totalPrice =
        ProductDetails.price -
        (ProductDetails.price * ProductDetails.discount) / 100; //eslint-disable-next-line
      const result = await ApiHelper.editProductDetails(id, ProductDetails);
      setError({
        ...error,
        message: result.data.message,
        type: "success",
      });
    
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
        <div className="col-12 col-sm-6 col-md-9">
          <h2>update Product Details</h2>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <Button variant="outlined" onClick={updateProductDetails}>
            Update Product Details
          </Button>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12 col-md-3">
          <p className="fw-bold mb-0">Product Name</p>
          <TextField
            id="product_Name"
            // type="text"
            placeholder="Product Name"
            error={error.some((x) => x.key === "name")}
            helperText={error.find((x) => x.key === "name")?.message}
            value={ProductDetails.name}
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
            type="text"
            id="product_Brand"
            placeholder="Brand"
            error={error.some((x) => x.key === "brand")}
            helperText={error.find((x) => x.key === "brand")?.message}
            value={ProductDetails.brand}
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
            type="text"
            placeholder="Alias"
            error={error.some((x) => x.key === "alias")}
            value={ProductDetails.alias}
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
        
          <select
            style={{
              padding: "16px",
              width: "200px",
              borderColor: "green",
              borderRadius: "3px",
            }}
            value={ProductDetails.category}
            onChange={(e) =>
              setProductDetails({
                ...ProductDetails,
                category: e.target.value,
              })
            }
          >
            {category.map((x) => {
              return (
                <option id={x._id} value={x._id}>
                  {x.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="container">
        <div className="row mt-3">
          <div className="col-12 col-md-8">
            <p className="fw-bold mb-1">Description</p>
            <Editor
              type="text"
              value={ProductDetails.description}
              error={error.some((x) => x.key === "description")}
              helperText={error.find((x) => x.key === "description")?.message}
              onKeyUp={(content, editor) => {
                setProductDetails({
                  ...ProductDetails,
                  description: editor.getContent(),
                });
              }}
              apiKey="xt6nnmvuoxxccns5n0ytenewl0slzrj07917amogch9x45oz"
              init={{
                selector: "textarea",
                height: 500,
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
              image={image}
              fetureImage={fetureImage}
              setfetureImg={setfetureImg}
              setProductDetails={setProductDetails}
              showFile={ShowFile}
            />
            <MultiImgDialogue
              image={image}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
            />

            <TextField
              value={ProductDetails.price}
              id="product_price"
              className="w-100 mt-3"
              label="Price"
              type="number"
              error={error.some((x) => x.key === "price")}
              helperText={error.find((x) => x.key === "price")?.message}
              onChange={(e) => {
                setProductDetails({ ...ProductDetails, price: e.target.value });
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
              value={ProductDetails.discount}
              id="product_Discount"
              className="w-100 mt-3"
              label="Discount"
              type="number"
              maxRows={2}
              onChange={(e) => {
                setProductDetails({
                  ...ProductDetails,
                  discount: e.target.value,
                });
              }}
              variant="outlined"
            />
            <TextField
              value={ProductDetails.countInStock}
              id="product_countInStock"
              error={error.some((x) => x.key === "countInStock")}
              helperText={error.find((x) => x.key === "countInStock")?.message}
              className="w-100 mt-3"
              label="countInstock"
              type="number"
              onChange={(e) => {
                setProductDetails({
                  ...ProductDetails,
                  countInStock: e.target.value,
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
