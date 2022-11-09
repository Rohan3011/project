import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import Temp from "./pages/temp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Temp />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
