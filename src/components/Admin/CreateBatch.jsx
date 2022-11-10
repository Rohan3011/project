import React, { useContext, useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";

const today = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate()
);

const oneYear = new Date();
oneYear.setFullYear(oneYear.getFullYear() + 1);

const schema = Yup.object().shape({
  startdate: Yup.date()
    .nullable()
    .min(today, `Start Date must be later than Today`)
    .max(oneYear, `Start Date at max is one Year`)
    .required(),
  trainername: Yup.string().required("Trainer name is required"),
  technology: Yup.string().required("Technology is required"),
});

const TRAINER_URL = "http://localhost:8081/api/users";

const options = [
  { value: 1, label: "One" },
  { value: 2, label: "Two" },
  { value: 3, label: "Three" },
];
const techOptions = [
  { value: "java", label: "Java" },
  { value: "python", label: "Python" },
  { value: "c++", label: "C++" },
];

export default function CreateBatch() {
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch Trainers
  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["fetchTrainer"],
  //   queryFn: () =>
  //     fetch(TRAINER_URL)
  //       .then((res) => res.json())
  //       .then((data) => data.filter((val) => val?.usertype == "2")),
  // });

  // if (isLoading) return <Spinner />;
  // if (error) console.error(error);
  // console.log(data);

  return (
    <Container
      id="createbatch"
      className="mt-20 w-full h-full flex flex-col items-center"
    >
      {errorMsg && (
        <Alert className="w-full" variant="danger">
          Create Batch Failed! Please Try again
        </Alert>
      )}

      <h1 className="text-5xl font-bold mb-8">Create New Batch</h1>

      <div className="w-full max-w-md bg-white p-4 border rounded-md">
        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            // try {
            //   setErrorMsg("");
            //   const response = await fetch(LOGIN_URL, {
            //     method: "POST",
            //     mode: "cors",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     redirect: "follow",
            //     referrerPolicy: "no-referrer",
            //     body: JSON.stringify({
            //       userid: values.userId,
            //       password: values.password,
            //     }),
            //   });
            //   console.log(response.json());
            // } catch (error) {
            //   console.log(error);
            //   setErrorMsg("Login Failed!");
            // }
            console.log(values);
          }}
          initialValues={{
            startdate: null,
            trainername: "",
            technology: "",
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form className="space-y-2" onSubmit={handleSubmit}>
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
                  {options.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
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
                  {techOptions.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
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
    </Container>
  );
}
