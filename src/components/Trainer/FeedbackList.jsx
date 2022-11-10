import React, { useState } from "react";
import { Container, Button, Form, Spinner, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiAlertFill } from "react-icons/ri";
import { FEEDBACK_URL } from "../../api";

const schema = Yup.object().shape({
  communication: Yup.number().min(1).max(5).nullable().required(),
  skills: Yup.number().min(1).max(5).nullable().required(),
  support: Yup.number().min(1).max(5).nullable().required(),
  handson: Yup.number().min(1).max(5).nullable().required(),
  comment: Yup.string().max(5000, "At max 5000 words").optional(),
});

// const feedbacks = [
//   {
//     id: 1,
//     comment: "ng elit.rtur iusto voluptatibus! Non",
//     communication: 3,
//     handson: 1,
//     skills: 3,
//     support: 2,
//     trainername: "1",
//   },
//   {
//     id: 2,
//     comment: "adfafd",
//     communication: 3,
//     handson: 1,
//     skills: 3,
//     support: 2,
//     trainername: "1",
//   },
//   {
//     id: 3,
//     comment: "adfafd",
//     communication: 3,
//     handson: 1,
//     skills: 3,
//     support: 2,
//     trainername: "1",
//   },
// ];

export default function FeedbackList() {
  // Fetch Feedbacks
  const { isLoading, error, data } = useQuery({
    queryKey: ["fetchFeedbacks"],
    queryFn: () => fetch(FEEDBACK_URL).then((res) => res.json()),
  });

  if (isLoading)
    return (
      <Container className="mt-20 w-full flex justify-center items-center">
        <Spinner variant="primary" />
      </Container>
    );
  if (error) return <FeedbackFailed />;

  return (
    <>
      {data ? (
        <Container id="feedback" className="mt-20">
          <h1 className="text-5xl font-bold mb-8">Feedback(s)</h1>
          <div className="w-full h-full flex flex-col md:flex-row flex-wrap items-center">
            {data?.map((val, idx) => (
              <FeedbackCard key={idx} {...val} />
            ))}
          </div>
        </Container>
      ) : (
        <FeedbackEmpty />
      )}
    </>
  );
}

const FeedbackCard = ({
  batchname,
  communication,
  handson,
  skills,
  support,
  comment,
}) => {
  return (
    <Card className="w-full max-w-sm max-h-96 m-2 overflow-auto">
      <Card.Header>{`Feedback by ${batchname} batch`}</Card.Header>
      <Card.Body>
        <Card.Title>Communication: {communication}</Card.Title>
        <Card.Title>handson: {handson}</Card.Title>
        <Card.Title>skills: {skills} </Card.Title>
        <Card.Title>support: {support} </Card.Title>
        <Card.Text>{comment}</Card.Text>
      </Card.Body>
    </Card>
  );
};

function FeedbackFailed() {
  return (
    <Container className="w-full h-full mt-20 bg-red-50 rounded shadow">
      <div className=" pt-8 pb-10 flex flex-col gap-6  items-center">
        <AiFillCloseCircle className="text-5xl text-red-700" />
        <h1 className="text-5xl font-bold text-center mb-3">
          Failed to fetch feedback!
        </h1>
        <span className="text-lg text-center font-semibold">
          Try{" "}
          <Link className="text-blue-700 underline " to={"/trainer#feedback"}>
            refresh
          </Link>{" "}
        </span>
      </div>
    </Container>
  );
}

function FeedbackEmpty() {
  return (
    <Container className="w-full h-full mt-20 bg-yellow-50 rounded shadow">
      <div className=" pt-8 pb-10 flex flex-col gap-6  items-center">
        <RiAlertFill className="text-5xl text-yellow-700" />
        <h1 className="text-5xl font-bold text-center mb-3">
          No feedback available!
        </h1>
      </div>
    </Container>
  );
}
