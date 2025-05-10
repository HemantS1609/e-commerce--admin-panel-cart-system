import React, { useEffect, useState } from "react";
import Portal from "../Portal/Portal";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import RoleDropDown from "../RoleDropDown/RoleDropDown";
import { showError, showSuccess } from "../../utils/toastUtil";
import "./addUserModal.css";

const AddUserModal = ({
  isOpen,
  setIsOpen,
  title,
  setList,
  isEdit,
  setIsEdit,
}) => {
  const [data, setData] = useState({
    id: isEdit?.id ? isEdit?.id : Date.now(),
    name: isEdit?.name ? isEdit?.name : "",
    email: isEdit?.email ? isEdit?.email : "",
    role: isEdit?.role ? isEdit?.role : "",
  });

  const handleChange = (e) => {
    const { id, value } = e?.target;
    setData((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const handleSubmit = () => {
    if (!data?.name && !data?.email && !data?.role) {
      showError("Please fill the data!!!");
      return;
    }
    const existUsers = JSON.parse(localStorage.getItem("users"));
    let updatedUser;
    if (isEdit?.id) {
      //update the user
      updatedUser = existUsers?.map((o) =>
        o?.id === isEdit?.id ? { ...data, id: isEdit?.id } : o
      );
      showSuccess("User updated successfully!!!");
    } else {
      //add the user
      updatedUser = [...existUsers, data];
      showSuccess("User added successfully!!!");
    }
    setList(updatedUser);
    localStorage.setItem("users", JSON.stringify(updatedUser));
    setData({
      id: Date.now(),
      name: "",
      email: "",
      role: "",
    });
    setIsEdit(null);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isEdit?.id) {
      setData(isEdit);
    }
  }, [isEdit]);

  if (!isOpen) return null;
  return (
    <Portal>
      <div className="portal-overlay-container">
        <div className="main-portal">
          <h4>{title}</h4>

          <div className="cmb-20">
            <TextInput
              id="name"
              label="Name"
              value={data?.name}
              placeholder="Enter name"
              onChange={handleChange}
            />
          </div>
          <div className="cmb-20">
            <TextInput
              id="email"
              label="Email"
              value={data?.email}
              placeholder="Enter email"
              onChange={handleChange}
            />
          </div>
          <div className="cmb-20">
            <RoleDropDown
              id={"role"}
              value={data?.role}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex gap-3 text-center">
            <Button text="Submit" onClick={handleSubmit} />
            <Button text="Close" onClick={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default AddUserModal;
