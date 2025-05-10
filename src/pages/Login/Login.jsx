import React, { useState } from "react";
import "./login.css";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import { showError, showSuccess } from "../../utils/toastUtil";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e?.target;
    setLoginData((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const handleLogin = () => {
    const adminData = JSON.parse(localStorage.getItem("admin"));
    if (!loginData?.email && !loginData?.password) {
      showError("Email and password are required!!");
      return;
    }

    if (
      adminData?.email === loginData?.email &&
      adminData?.password === loginData?.password
    ) {
      adminData.isAuthenticate = true;
      localStorage.setItem("admin", JSON.stringify(adminData));
      navigate("/dashboard");
      showSuccess("Login Successfully!!!");
      setLoginData({
        email: "",
        password: "",
      });
    } else {
      showError("Email and Password do not matched!!");
    }
  };
  return (
    <div className="login-container">
      <div className="login-block">
        <h2 className="cmb-20">Login</h2>
        <div className="cmb-20">
          <TextInput
            id={"email"}
            value={loginData?.email}
            label="Email"
            placeholder="Enter your email"
            onChange={handleChange}
            type="email"
          />
        </div>

        <div className="cmb-30">
          <TextInput
            id={"password"}
            value={loginData?.password}
            label="Password"
            placeholder="Enter your password"
            onChange={handleChange}
            type="password"
          />
        </div>

        <Button text={"Login"} onClick={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
