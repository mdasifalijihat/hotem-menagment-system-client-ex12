
import React from "react";
import { Navigate } from "react-router-dom";

const AdminAuthRoute = ({ children }) => {
  const token = localStorage.getItem("admin-token");

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default AdminAuthRoute;
