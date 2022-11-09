import React from "react";
import { Button, Form } from "react-bootstrap";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";


const schema = Yup.object().shape({
    userId: Yup.string().required(),
    password: Yup.string().max(255).required('Password is required'),

});


export default function Login() {


    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="pt-8 lg:pt-16 pb-10">
                <h1 className="text-5xl font-bold text-center mb-3">Login</h1>
                <span className="text-sm font-semibold">New User?   <Link className="text-blue-700 " to={'/register'}>Register</Link> </span>

            </div>
            <div className="w-full max-w-md bg-white p-4 border rounded-md">
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify({
                                ...values,
                            }, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                    initialValues={{
                        userId: '',
                        password: '',

                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                    }) => (

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


                            <Form.Group className="" >
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
                                <Button className="w-full bg-blue-700 hover:opacity-95" type="submit">
                                    Login
                                </Button>
                            </Form.Group>
                        </Form>
                    )}
                </Formik>

            </div>
        </div >
    );
}
