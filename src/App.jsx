import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProductLits from "./pages/ProductsList";
import { Toast } from "./components/Toast/Toast";
import { useEffect } from "react";
import ProductDetails from "./pages/ProductsList/ProductDetails/ProductDetails";
import CartManagement from "./pages/CartManagement/CartManagement";

function App() {
  //to store the data in localstorage when app run first time
  useEffect(() => {
    if (!localStorage.getItem("users")) {
      const users = [
        {
          id: 1,
          name: "Admin",
          email: "admin@test.com",
          role: "admin",
          isAuthenticate: false,
        },
        {
          id: 2,
          name: "Hemant",
          email: "hemant@test.com",
          role: "user",
          isAuthenticate: false,
        },
        {
          id: 3,
          name: "Bhavesh",
          email: "bhavesh@test.com",
          role: "user",
          isAuthenticate: false,
        },
      ];
      localStorage.setItem("users", JSON.stringify(users));
    }

    if (!localStorage.getItem("admin")) {
      const admin = {
        name: "admin",
        email: "admin@test.com",
        password: "123",
        isAuthenticate: false,
      };
      localStorage.setItem("admin", JSON.stringify(admin));
    }
  }, []);

  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/admin-login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/product-list" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product-list" element={<ProductLits />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
