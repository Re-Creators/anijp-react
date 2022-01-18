import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthLayout({ children }) {
  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (loggedIn) return <Navigate to="/" />;
  return children;
}

export default AuthLayout;
