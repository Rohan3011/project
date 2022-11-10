import React, { useState } from "react";
import { Container, Button, Form, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const schema = Yup.object().shape({
  communication: Yup.number().min(1).max(5).nullable().required(),
  skills: Yup.number().min(1).max(5).nullable().required(),
  support: Yup.number().min(1).max(5).nullable().required(),
  handson: Yup.number().min(1).max(5).nullable().required(),
  comment: Yup.string().max(5000, "At max 5000 words").optional(),
});

export default function Feedback() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  return (
    <Container id="feedback" className="mt-20">
      <h1 className="text-5xl font-bold mb-8">Feedback</h1>
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
                    setErrorMsg("Login Failed!");
                  }
                } finally {
                  setIsLoading(false);
                }
              }}
              initialValues={{
                communication: null,
                skills: null,
                support: null,
                handson: null,
                comment: "",
              }}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <Form className="space-y-2" onSubmit={handleSubmit}>
                  <Form.Group className="">
                    <Form.Label>Communication</Form.Label>
                    <Form.Control
                      type="number"
                      name="communication"
                      value={values.communication}
                      onChange={handleChange}
                      isInvalid={!!errors.communication}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.communication}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="">
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                      type="number"
                      name="skills"
                      value={values.skills}
                      onChange={handleChange}
                      isInvalid={!!errors.skills}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.skills}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="">
                    <Form.Label>Support</Form.Label>
                    <Form.Control
                      type="number"
                      name="support"
                      value={values.support}
                      onChange={handleChange}
                      isInvalid={!!errors.support}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.support}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="">
                    <Form.Label>Hands-on</Form.Label>
                    <Form.Control
                      type="number"
                      name="handson"
                      value={values.handson}
                      onChange={handleChange}
                      isInvalid={!!errors.handson}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.handson}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="comment"
                      value={values.comment}
                      onChange={handleChange}
                      isInvalid={!!errors.comment}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.comment}
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
      </div>
    </Container>
  );
}
