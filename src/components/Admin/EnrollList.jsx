import React, { useState } from "react";
import { ENROLL_URL } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { Button, Container, Modal, Spinner, Table } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiAlertFill } from "react-icons/ri";
import { Link } from "react-router-dom";

// const dummy = [
//   {
//     id: 1,
//     studentname: "student1",
//     batchname: "b1",
//     technology: "java",
//     trainername: "Xyz",
//     startdate: new Date().toDateString(),
//   },
//   {
//     id: 2,
//     studentname: "student2",
//     batchname: "b1",
//     technology: "java",
//     trainername: "Xyz",
//     startdate: new Date().toDateString(),
//   },
//   {
//     id: 3,
//     studentname: "student3",
//     batchname: "b1",
//     technology: "java",
//     trainername: "Xyz",
//     startdate: new Date().toDateString(),
//   },
// ];

export default function EnrollList() {
  // Fetch EnrollList
  const { isLoading, error, data } = useQuery({
    queryKey: ["enrolllist"],
    queryFn: () => fetch(ENROLL_URL).then((res) => res.json()),
  });

  if (isLoading)
    return (
      <Container className="mt-20 w-full flex justify-center items-center">
        <Spinner variant="primary" />
      </Container>
    );
  if (error) return <EnrollFailed />;

  return (
    <>
      {data ? (
        <Container id="enrolllist" className="mt-20">
          <h1 className="text-5xl font-bold mb-8">Enrollments</h1>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Id</th>
                <th>Student Name</th>
                <th>Batch Name</th>
                <th>Technology</th>
                <th>Trainer Name</th>
                <th>Start Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                ({
                  id,
                  studentname,
                  batchname,
                  techname,
                  trainername,
                  startDate,
                }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{studentname}</td>
                    <td>{batchname}</td>
                    <td>{techname}</td>
                    <td>{trainername}</td>
                    <td>{startDate}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Container>
      ) : (
        <EnrollEmpty />
      )}
    </>
  );
}

function EnrollFailed() {
  return (
    <Container className="w-full h-full mt-20 bg-red-50 rounded shadow">
      <div className=" pt-8 pb-10 flex flex-col gap-6  items-center">
        <AiFillCloseCircle className="text-5xl text-red-700" />
        <h1 className="text-5xl font-bold text-center mb-3">
          Failed to fetch enroll list!
        </h1>
        <span className="text-lg text-center font-semibold">
          Try{" "}
          <Link className="text-blue-700 underline " to={"/admin#enrollist"}>
            refresh
          </Link>{" "}
        </span>
      </div>
    </Container>
  );
}

function EnrollEmpty() {
  return (
    <Container className="w-full h-full mt-20 bg-yellow-50 rounded shadow">
      <div className=" pt-8 pb-10 flex flex-col gap-6  items-center">
        <RiAlertFill className="text-5xl text-yellow-700" />
        <h1 className="text-5xl font-bold text-center mb-3">No Enrollement</h1>
      </div>
    </Container>
  );
}
