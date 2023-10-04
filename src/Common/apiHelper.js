import axios from "axios";

class apiHelper {
  constructor() {
    this.BaseUrl = "http://localhost:5000";
  }

  //user api
  getUser () {
    return axios.get(`${this.BaseUrl}/admin/user/read`);
  }
  updateUser (id, data) {
    return axios.put(`${this.BaseUrl}/admin/user/update/${id}`, data);
  }
  insertUser (userdetails) {
    return axios.post(`${this.BaseUrl}/admin/user/create`, userdetails);
  }
  deleteUser (id) {
    return axios.post(`${this.BaseUrl}/admin/user/delete/${id}`);
  }
  loginUser (data) {
    return axios.post(`${this.BaseUrl}/admin/user/login`, data);
  }

  

  //product api
  getMedia () {
    return axios.get(`${this.BaseUrl}/admin/fetch/media`);
  }
  uploadMedia (data) {
    return axios.post(`${this.BaseUrl}/admin/upload/file`, data);
  }
  createProduct (data) {
    return axios.post(`${this.BaseUrl}/admin/product/create`, data);
  }
  deleteProduct (id) {
    return axios.get(`${this.BaseUrl}/admin/product/delete/${id}`);
  }
  getProductById (id) {
    return axios.get(`${this.BaseUrl}/admin/product/byid/${id}`);
  }
  editProductDetails (id, data) {
    return axios.post(`${this.BaseUrl}/admin/product/edit/${id}`, data);
  }
  getProducts () {
    return axios.get(`${this.BaseUrl}/admin/product/fetch`);
  }
  getProductsCategory () {
    return axios.get(`${this.BaseUrl}/admin/product/fetch`);
  }
  
  

  //product category api
  addproductCategory (data) {
    return axios.post(`${this.BaseUrl}/admin/product/category/create`,data);
  }
  fetchproductCategory () {
    return axios.get(`${this.BaseUrl}/admin/product/category/get`);
  }
  deleteproductCategory (id) {
    return axios.post(`${this.BaseUrl}/admin/product/category/delete/${id}`);
  }
  updateproductCategory (id,data) {
    return axios.put(`${this.BaseUrl}/admin/product/category/update/${id}`,data);
  }
  productCategoryById (id) {
    return axios.get(`${this.BaseUrl}/admin/product/category/find/${id}`);
  }





}

const ApiHelper = new apiHelper();
export default ApiHelper;
