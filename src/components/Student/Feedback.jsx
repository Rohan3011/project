import React, { useState } from "react";
import { Container, Button, Form, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineFeedback } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ADD_FEEDBACK_URL, TRAINER_URL } from "../../api";
import { useQuery } from "@tanstack/react-query";

const schema = Yup.object().shape({
  batchname: Yup.string().required("Batch name is required").max(256),
  trainername: Yup.string().required("Trainer name is required"),
  communication: Yup.number().min(1).max(5).nullable().required(),
  skills: Yup.number().min(1).max(5).nullable().required(),
  support: Yup.number().min(1).max(5).nullable().required(),
  handson: Yup.number().min(1).max(5).nullable().required(),
  comment: Yup.string().max(5000, "At max 5000 words").optional(),
});

export default function Feedback() {
  const [loading, setloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  // Fetch Trainers
  const { isLoading, error, data } = useQuery({
    queryKey: ["fetchTrainer"],
    queryFn: () => fetch(TRAINER_URL).then((res) => res.json()),
  });

  if (isLoading)
    return (
      <Container className="mt-20 w-full flex justify-center items-center">
        <Spinner variant="primary" />
      </Container>
    );

  return (
    <Container id="feedback" className="mt-20">
      <div className="flex justify-center items-start">
        <MdOutlineFeedback className="w-14 h-14 mr-4" />
        <h1 className="text-5xl font-bold mb-8 text-center">Feedback</h1>
      </div>
      <div className="w-full h-full flex flex-col items-center">
        {loading ? (
          <Spinner variant="primary" />
        ) : success ? (
          <FeedbackSuccess />
        ) : (
          <div className="w-full max-w-md bg-white p-4 border rounded-md">
            <Formik
              validationSchema={schema}
              onSubmit={async (values) => {
                try {
                  setloading(true);
                  setErrorMsg("");
                  const response = await fetch(ADD_FEEDBACK_URL, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify(values),
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
                  setloading(false);
                }
              }}
              initialValues={{
                batchname: "",
                trainername: "",
                communication: "",
                skills: "",
                support: "",
                handson: "",
                comment: "",
              }}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <Form className="space-y-2" onSubmit={handleSubmit}>
                  <Form.Group className="">
                    <Form.Label>Trainer Name</Form.Label>

                    <Form.Select
                      name="trainername"
                      value={values.trainername}
                      onChange={handleChange}
                      isInvalid={!!errors.trainername}
                      aria-label="select trainer name"
                    >
                      <option value={""}>select trainer</option>
                      {data?.map((val) => (
                        <option key={val?.id} value={val?.trainername}>
                          {val?.trainername}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.trainername}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="">
                    <Form.Label>Batch Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="batchname"
                      placeholder="Enter batch name"
                      value={values.batchname}
                      onChange={handleChange}
                      isInvalid={!!errors.batchname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.batchname}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="">
                    <Form.Label>Communication</Form.Label>
                    <Form.Control
                      type="number"
                      name="communication"
                      placeholder="Rate communication "
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
                      placeholder="Rate skills "
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
                      placeholder="Rate support "
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
                      placeholder="Rate hands-on "
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
                      placeholder="Enter your comment"
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

function FeedbackSuccess() {
  return (
    <div className="w-full h-full bg-blue-50 rounded shadow">
      <div className=" pt-8 pb-10 flex flex-col gap-6  items-center">
        <BsCheckCircleFill className="text-5xl text-green-700" />
        <h1 className="text-5xl font-bold text-center mb-3">
          Feedback submitted successfully!
        </h1>
        <span className="text-lg text-center font-semibold">
          Go back to{" "}
          <Link className="text-blue-700 underline " to={"/student"}>
            Dashboard
          </Link>{" "}
        </span>
      </div>
    </div>
  );
}
