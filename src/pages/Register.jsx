import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  Spinner,
  ToggleButton,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  userId: Yup.string().required(),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string().max(255).required("Password is required"),
  techname: Yup.string().optional(),
});

export default function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userType, setUserType] = useState("student");

  const radios = [
    { name: "Student", value: "student" },
    { name: "Trainer", value: "trainer" },
  ];

  return (
    <Container className="w-full h-full flex flex-col items-center">
      <div className=" pt-8 pb-10">
        <h1 className="text-5xl font-bold text-center mb-3">Register</h1>
        <span className="text-sm font-semibold">
          Already registered?{" "}
          <Link className="text-blue-700 " to={"/login"}>
            Login
          </Link>{" "}
        </span>
      </div>
      {isLoading ? (
        <Spinner variant="primary" />
      ) : success ? (
        <RegisterdSuccess />
      ) : (
        <div className="w-full max-w-md bg-white p-4 border rounded-md">
          <Formik
            validationSchema={schema}
            onSubmit={async (values) => {
              const data =
                userType == "student"
                  ? {
                      userid: values.userId,
                      password: values.password,
                      studentname: values.name,
                      email: values.email,
                      moblie: values.mobile,
                      techname: values.techname,
                    }
                  : {
                      userid: values.userId,
                      password: values.password,
                      trainername: values.name,
                      email: values.email,
                      moblie: values.mobile,
                      techname: values.techname,
                    };
              try {
                setIsLoading(true);
                setErrorMsg("");
                const response = await fetch(
                  `http://localhost:8081/api/${userType}/register`,
                  {
                    method: "POST",
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify(data),
                  }
                );
                console.log(response.json());
                setSuccess(true);
              } catch (err) {
                if (!err?.response) {
                  setErrorMsg("No Server Response");
                } else if (err.response?.status == 400) {
                  setErrorMsg("Missing UserId or Password");
                } else if (err.response?.status == 401) {
                  setErrorMsg("Unauthorized");
                } else {
                  setErrorMsg("Register Failed!");
                }
              } finally {
                setIsLoading(false);
              }
            }}
            initialValues={{
              name: "",
              email: "",
              userId: "",
              password: "",
              userType: "",
              techname: "",
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
              <Form className="space-y-2" onSubmit={handleSubmit}>
                <ButtonGroup className="w-full mb-2">
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
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
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

                <Form.Group hidden={userType != "trainer"}>
                  <Form.Label>Technology name</Form.Label>
                  <Form.Control
                    type="text"
                    name="techname"
                    placeholder="Enter Technology Name"
                    value={values.techname}
                    onChange={handleChange}
                    isInvalid={!!errors.techname}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.techname}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-3">
                  <Button
                    className="w-full bg-blue-700 hover:opacity-95"
                    type="submit"
                  >
                    Submit
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
    </Container>
  );
}

function RegisterdSuccess() {
  return (
    <div className="w-full h-full bg-blue-50 rounded shadow">
      <div className=" pt-8 pb-10 flex flex-col gap-6  items-center">
        <BsCheckCircleFill className="text-5xl text-green-700" />
        <h1 className="text-5xl font-bold text-center mb-3">
          Registered Successfully!
        </h1>
        <span className="text-lg text-center font-semibold">
          Go to{" "}
          <Link className="text-blue-700 underline " to={"/login"}>
            Login
          </Link>{" "}
        </span>
      </div>
    </div>
  );
}
