/* eslint-disable react/prop-types */
import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "./Context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext(); 

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
