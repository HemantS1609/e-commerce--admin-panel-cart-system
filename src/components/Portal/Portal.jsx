import React from "react";
import ReactDom from "react-dom";

const Portal = ({ children }) => {
  const portalId = document.getElementById("portal-root");
  return ReactDom.createPortal(children, portalId);
};

export default Portal;
