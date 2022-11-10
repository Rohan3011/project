import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  Spinner,
  ToggleButton,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, Navigate, redirect } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const schema = Yup.object().shape({
  userId: Yup.string().required(),
  password: Yup.string().max(255).required("Password is required"),
});

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [userType, setUserType] = useState("student");

  const radios = [
    { name: "Student", value: "student" },
    { name: "Trainer", value: "trainer" },
    { name: "Admin", value: "admin" },
  ];

  if (success) return <Navigate to={`/${userType}`} />;

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

      <div></div>

      {isLoading ? (
        <Spinner variant="primary" />
      ) : (
        <div className="w-full max-w-md bg-white p-4 border rounded-md">
          <Formik
            validationSchema={schema}
            onSubmit={async (values) => {
              try {
                setIsLoading(true);
                setErrorMsg("");
                const response = await fetch(
                  `http://localhost:8081/api/${userType}/login`,
                  {
                    method: "POST",
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify({
                      userid: values.userId,
                      password: values.password,
                      usertype: userType,
                    }),
                  }
                );
                const data = await response.json();
                console.log(data);
                setAuth({
                  userid: values.userId,
                  password: values.password,
                  usertype: userType,
                  ...data,
                });
                setSuccess(true);
              } catch (err) {
                if (!err?.response) {
                  setErrorMsg("No Server Response");
                } else if (err.response?.status == 400) {
                  setErrorMsg("Missing UserId or Password");
                } else if (err.response?.status == 401) {
                  setErrorMsg("Unauthorized");
                } else {
                  setErrorMsg("Login Failed!");
                }
              } finally {
                setIsLoading(false);
              }
            }}
            initialValues={{
              userId: "",
              password: "",
            }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form className="space-y-2" onSubmit={handleSubmit}>
                <ButtonGroup className="w-full max-w-md mb-6">
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      name="userType"
                      variant={
                        userType === radio.value ? "primary" : "outline-primary"
                      }
                      value={radio.value}
                      checked={userType === radio.value}
                      onChange={(e) => setUserType(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>

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
                    <span className="text-red-600 text-sm">{errorMsg}</span>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
