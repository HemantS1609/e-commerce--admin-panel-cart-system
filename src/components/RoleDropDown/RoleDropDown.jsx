import React from "react";
import "./roleDropDown.css";

const RoleDropDown = ({ value, id, onChange }) => {
  return (
    <div className="role-dropdown-container">
      <label>Role</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="option-input"
      >
        <option value="">--Select--</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>
  );
};

export default RoleDropDown;
