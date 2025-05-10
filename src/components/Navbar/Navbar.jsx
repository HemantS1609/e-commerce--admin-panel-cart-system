import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutModal from "../LogoutModal/LogoutModal";
import "./navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isLogout, setIsLogout] = useState(false);
  const [role, setRole] = useState("");
  const cartItems = useSelector((state) => state.cart.products);
  const totalItems = cartItems.reduce((acc, item) => acc + item?.quantity, 0);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    if (users?.users) setRole(users?.role);
  }, []);

  return (
    <>
      <LogoutModal title={"Logout"} isOpen={isLogout} setIsOpen={setIsLogout} />
      <nav className="navbar">
        <ul>
          {role === "admin" && (
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => `${isActive ? "active-name" : ""}`}
              >
                Dashboard
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/product-list"
              className={({ isActive }) => `${isActive ? "active-name" : ""}`}
            >
              Products
            </NavLink>
          </li>
          <li className="cart-icon">
            <span className="product-number">{totalItems}</span>
            <NavLink to="/cart">
              <i className="bi bi-cart3" />
            </NavLink>
          </li>

          {role === "admin" && (
            <li onClick={() => setIsLogout(true)}>Logout</li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
