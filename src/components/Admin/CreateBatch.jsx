import React, { useContext, useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { BATCH_URL, TRAINER_URL } from "../../api";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const today = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate()
);

const oneYear = new Date();
oneYear.setFullYear(oneYear.getFullYear() + 1);

const schema = Yup.object().shape({
  batchname: Yup.string().required("Batch name is required").max(256),
  startdate: Yup.date()
    .nullable()
    .min(today, `Start Date must be later than Today`)
    .max(oneYear, `Start Date at max is one Year`)
    .required(),
  trainername: Yup.string().required("Trainer name is required"),
  technology: Yup.string().required("Technology is required"),
});

export default function CreateBatch() {
  const [errorMsg, setErrorMsg] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <Container
      id="createbatch"
      className="mt-20 w-full h-full flex flex-col items-center"
    >
      {errorMsg && (
        <Alert className="w-full" variant="danger">
          Create Batch Failed! Please try again
        </Alert>
      )}

      <h1 className="text-5xl font-bold mb-8">Create New Batch</h1>
      {loading ? (
        <Spinner variant="primary" />
      ) : success ? (
        <BactchSuccess />
      ) : (
        <div className="w-full max-w-md bg-white p-4 border rounded-md">
          <Formik
            validationSchema={schema}
            onSubmit={async (values) => {
              try {
                setLoading(true);
                setErrorMsg("");
                const response = await fetch(BATCH_URL, {
                  method: "POST",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  redirect: "follow",
                  referrerPolicy: "no-referrer",
                  body: JSON.stringify({
                    batchname: values.batchname,
                    startdate: values.startdate,
                    trainername: values.trainername,
                    techname: values.technology,
                  }),
                });
                console.log(response.json());
                setSuccess(true);
              } catch (error) {
                console.log(error);
                setErrorMsg(true);
              } finally {
                setLoading(false);
              }
            }}
            initialValues={{
              batchname: "",
              startdate: null,
              trainername: "",
              technology: "",
            }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form className="space-y-2" onSubmit={handleSubmit}>
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
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startdate"
                    value={values.startdate}
                    onChange={handleChange}
                    isInvalid={!!errors.startdate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.startdate}
                  </Form.Control.Feedback>
                </Form.Group>

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
                  <Form.Label>Technology</Form.Label>

                  <Form.Select
                    name="technology"
                    value={values.technology}
                    onChange={handleChange}
                    isInvalid={!!errors.technology}
                    aria-label="select technology name"
                  >
                    <option value={""}>select technology</option>
                    {data?.map((val) => (
                      <option key={val?.id} value={val?.techname}>
                        {val?.techname}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.technology}
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

function BactchSuccess() {
  return (
    <div className="w-full h-full bg-blue-50 rounded shadow">
      <div className=" pt-8 pb-10 flex flex-col gap-6  items-center">
        <BsCheckCircleFill className="text-5xl text-green-700" />
        <h1 className="text-5xl font-bold text-center mb-3">
          Batch Created Successfully!
        </h1>
        <span className="text-lg text-center font-semibold">
          Go back{" "}
          <Link className="text-blue-700 underline " to={"/admin"}>
            Dashboard
          </Link>{" "}
        </span>
      </div>
    </div>
  );
}
