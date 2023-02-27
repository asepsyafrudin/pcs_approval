import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GlobalConsumer } from "../../../context/store";

function ProtectedAdmin(props) {
  const { adminRoles, children } = props;
  if (!adminRoles) {
    return <Navigate to="/pagenotfound" replace />;
  }
  return children ? children : <Outlet />;
}

export default GlobalConsumer(ProtectedAdmin);
