import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Container, Modal, Table } from "react-bootstrap";

const dummy = [
  {
    id: 1,
    studentname: "student1",
    batchname: "b1",
    technology: "java",
    trainername: "Xyz",
    startdate: new Date().toDateString(),
  },
  {
    id: 2,
    studentname: "student2",
    batchname: "b1",
    technology: "java",
    trainername: "Xyz",
    startdate: new Date().toDateString(),
  },
  {
    id: 3,
    studentname: "student3",
    batchname: "b1",
    technology: "java",
    trainername: "Xyz",
    startdate: new Date().toDateString(),
  },
];

export default function EnrollList() {
  return (
    <Container id="enrolllist" className="mt-20">
      <h1 className="text-5xl font-bold mb-8">My Enrollments</h1>
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
          {dummy.map(
            ({
              id,
              studentname,
              batchname,
              technology,
              trainername,
              startdate,
            }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{studentname}</td>
                <td>{batchname}</td>
                <td>{technology}</td>
                <td>{trainername}</td>
                <td>{startdate}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </Container>
  );
}
