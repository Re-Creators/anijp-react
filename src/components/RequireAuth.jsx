import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../features/user/userSlice";

function RequireAuth({ children }) {
  const user = useSelector(selectUser);

  if (!user) return <Navigate to="/" />;

  return children;
}

export default RequireAuth;
