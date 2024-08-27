import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const usersjwttoken = localStorage.getItem("token");
  return usersjwttoken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;