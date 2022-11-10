import React, { useState } from "react";
import { Button, ButtonGroup, Form, ToggleButton } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = Yup.object().shape({
  name: Yup.string().required(),
  userId: Yup.string().required(),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string().max(255).required("Password is required"),
  mobile: Yup.string()
    .required()
    .matches(phoneRegExp, "Phone number is not valid"),
  techname: Yup.string().optional(),
});

const REGISTER_URL = "http://localhost:8081/api/users/register";

export default function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Student", value: "1" },
    { name: "Trainer", value: "2" },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className=" pt-8 pb-10">
        <h1 className="text-5xl font-bold text-center mb-3">Register</h1>
        <span className="text-sm font-semibold">
          Already registered?{" "}
          <Link className="text-blue-700 " to={"/login"}>
            Login
          </Link>{" "}
        </span>
      </div>
      <div className="w-full max-w-md bg-white p-4 border rounded-md">
        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            try {
              setErrorMsg("");
              const response = await fetch(REGISTER_URL, {
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
                  name: values.name,
                  email: values.email,
                  moblie: values.mobile,
                  usertype: radioValue,
                  techname: values.techname,
                }),
              });
              console.log(response.json());
            } catch (error) {
              console.log(error);
              setErrorMsg("Register Failed! Please try again");
            }
          }}
          initialValues={{
            name: "",
            email: "",
            mobile: "",
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
                      radioValue === radio.value ? "primary" : "outline-primary"
                    }
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
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
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={values.mobile}
                  onChange={handleChange}
                  isInvalid={!!errors.mobile}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mobile}
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

              <Form.Group hidden={radioValue != "2"}>
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
