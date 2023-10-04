import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Screen/Layout";
import Path from "./Common/Path";
import Dashboard from "./Screen/Dashboard/Dashboard";
import UserScreen from "./Screen/User/UserScreen";
import LoginScreen from "./Screen/Login/LoginScreen";
import AddProduct from "./Screen/Product/AddProduct";
import PreviewProduct from "./Screen/Product/PreviewProduct";
import EditProduct from "./Screen/Product/EditProduct";
import ProductCategory from "./Screen/Product/Category";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path={Path.Dashboard}
            element={<Layout content={<Dashboard />} />}
          />
          <Route
            path={Path.AddproductScreen}
            element={<Layout content={<AddProduct />} />}
          />
          <Route
            path={Path.user}
            element={<Layout content={<UserScreen />} />}
          />
          <Route
            path={Path.previewProducts}
            element={<Layout content={<PreviewProduct/>} />}
          />
          <Route
            path={Path.editproductScreen}
            element={<Layout content={<EditProduct/>} />}
          />
          <Route
            path={Path.ProductsCategory}
            element={<Layout content={<ProductCategory/>} />}
          />
          <Route path={Path.login} element={<LoginScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
