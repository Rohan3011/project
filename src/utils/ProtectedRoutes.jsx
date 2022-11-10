import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

export default function ProtectedRoutes({ children, userType }) {
  const { auth } = useContext(AuthContext);
  return auth?.userid ? (
    auth?.usertype == userType ? (
      children
    ) : (
      <NotAvailable />
    )
  ) : (
    <Navigate to="/login" />
  );
}

function NotAvailable() {
  return (
    <div>
      <h1>Page is Protected</h1>
    </div>
  );
}
