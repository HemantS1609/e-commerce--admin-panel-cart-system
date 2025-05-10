import React from "react";
import Portal from "../Portal/Portal";
import "./deleteModal.css";
import Button from "../Button/Button";
import { showSuccess } from "../../utils/toastUtil";

const DeleteModal = ({ isOpen, setIsOpen, title, setList }) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    const userData = JSON.parse(localStorage.getItem("users"));
    const updatedData = userData?.filter((o) => o?.id !== isOpen?.id);
    setList(updatedData);
    showSuccess("User deleted successfully!!!");
    localStorage.setItem("users", JSON.stringify(updatedData));
    setIsOpen(false);
  };
  return (
    <Portal>
      <div className="logout-overlay-container">
        <div className="main-portal">
          <h4>{title}</h4>

          <h5>Are you sure want to delete this user?</h5>
          <div className="d-flex gap-3 text-center">
            <Button text="Yes" onClick={handleDelete} />
            <Button text="Cancle" onClick={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default DeleteModal;
