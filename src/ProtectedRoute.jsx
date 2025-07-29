// ProtectedRoute.jsx
import React from "react";
import { useAuth } from "./hooks/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
