import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoute({ children }) {
  if (localStorage.getItem("userToken")) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}