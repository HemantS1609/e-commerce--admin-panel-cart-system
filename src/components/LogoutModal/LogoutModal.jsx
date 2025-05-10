import React from "react";
import Portal from "../Portal/Portal";
import "./logoutModal.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ isOpen, setIsOpen, title }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleLogout = () => {
    const adminData = JSON.parse(localStorage.getItem("admin"));
    if (adminData) {
      adminData.isAuthenticate = false;
      localStorage.setItem("admin", JSON.stringify(adminData));
      navigate("/");
    }
  };
  return (
    <Portal>
      <div className="logout-overlay-container">
        <div className="main-portal">
          <h4>{title}</h4>

          <h5>Are you sure want to logout?</h5>
          <div className="d-flex gap-3 text-center">
            <Button text="Yes" onClick={handleLogout} />
            <Button text="Cancle" onClick={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default LogoutModal;
