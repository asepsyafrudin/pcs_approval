import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GlobalConsumer } from "../../../context/store";

function ProtectedRoute(props) {
  const { statusLogin, children } = props;
  if (!statusLogin) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
}

export default GlobalConsumer(ProtectedRoute);
