import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Container, Modal, Table } from "react-bootstrap";

const dummy = [
  {
    id: 1,
    studentname: "student1",
    technology: "java",
    trainername: "Xyz",
    startdate: new Date().toDateString(),
  },
  {
    id: 2,
    studentname: "student2",
    technology: "java",
    trainername: "Xyz",
    startdate: new Date().toDateString(),
  },
  {
    id: 3,
    studentname: "student3",
    technology: "java",
    trainername: "Xyz",
    startdate: new Date().toDateString(),
  },
];

export default function EnrollList() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container id="batchlist" className="mt-20">
      <h1 className="text-5xl font-bold mb-8">Enroll List</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Id</th>
            <th>Student Name</th>
            <th>Technology</th>
            <th>Trainer Name</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummy.map(
            ({ id, studentname, technology, trainername, startdate }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{studentname}</td>
                <td>{technology}</td>
                <td>{trainername}</td>
                <td>{startdate}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    className="bg-red-700 hover:opacity-95"
                    onClick={handleShow}
                  >
                    Delete
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Woohoo, you're sure to delete student{" "}
                      <span>{studentname}</span> ?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        className="bg-gray-700 hover:opacity-95"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        className="bg-blue-700 hover:opacity-95"
                        onClick={handleClose}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </Container>
  );
}
