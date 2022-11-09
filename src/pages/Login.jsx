import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const schema = Yup.object().shape({
  userId: Yup.string().required(),
  password: Yup.string().max(255).required("Password is required"),
});

const LOGIN_URL = "/api/users/login";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="pt-8 lg:pt-16 pb-10">
        <h1 className="text-5xl font-bold text-center mb-3">Login</h1>
        <span className="text-sm font-semibold">
          New User?
          <Link className="ml-1 text-blue-700 " to={"/register"}>
            Register
          </Link>
        </span>
      </div>
      <div className="w-full max-w-md bg-white p-4 border rounded-md">
        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            try {
              setErrorMsg("");
              const response = await axios.post(
                LOGIN_URL,
                JSON.stringify(values)
              );
              console.log(JSON.stringify(response?.data));
              setAuth(values);
            } catch (error) {
              console.log(error);
              setErrorMsg("Login Failed!");
            }
          }}
          initialValues={{
            userId: "",
            password: "",
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form className="space-y-2" onSubmit={handleSubmit}>
              <Form.Group className="">
                <Form.Label>UserID</Form.Label>
                <Form.Control
                  type="text"
                  name="userId"
                  placeholder="Enter UserID"
                  value={values.userId}
                  onChange={handleChange}
                  isInvalid={!!errors.userId}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.userId}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter mobile Password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-3">
                <Button
                  className="w-full bg-blue-700 hover:opacity-95"
                  type="submit"
                >
                  Login
                </Button>
              </Form.Group>
              {errorMsg && (
                <div>
                  <span className="text-red-700 text-sm">{errorMsg}</span>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
