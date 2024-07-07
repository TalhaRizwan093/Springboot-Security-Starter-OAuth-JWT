import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  element: Component,
  ...rest
}: {
  element: React.ElementType;
  [key: string]: any;
}) => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/" /> : <Component {...rest} />;
};

export default ProtectedRoute;
