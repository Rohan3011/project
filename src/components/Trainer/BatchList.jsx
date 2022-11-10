import React from "react";
import { Container, Table } from "react-bootstrap";

const dummy = [
  {
    id: 1,
    batchname: "b1",
    technology: "java",
    trainername: "Xyz",
    startdate: new Date().toDateString(),
  },
  {
    id: 2,
    batchname: "b1",
    technology: "java",
    trainername: "Xyz",
    startdate: new Date().toDateString(),
  },
  {
    id: 3,
    batchname: "b1",
    technology: "java",
    trainername: "Xyz",
    startdate: new Date().toDateString(),
  },
];

export default function BatchList() {
  return (
    <Container id="batchlist" className="mt-20">
      <h1 className="text-5xl font-bold mb-8">Batch List</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Id</th>
            <th>Batch Name</th>
            <th>Technology</th>
            <th>Trainer Name</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {dummy.map(
            ({ id, batchname, technology, trainername, startdate }) => (
              <tr key={id}>
                <td>{id}</td>
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
