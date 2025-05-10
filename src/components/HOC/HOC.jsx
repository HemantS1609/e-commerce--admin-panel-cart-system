import React from "react";
import { Navigate } from "react-router-dom";

const HOc = (WrappedComponent) => {
  return (props) => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin?.isAuthenticate) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/admin-login" replace />;
    }
  };
};

export default HOc;
