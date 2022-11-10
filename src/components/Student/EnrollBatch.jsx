import React, { useState } from "react";
import { Button, Container, Modal, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";

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

export default function EnrollBatch() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container id="batchlist" className="mt-20">
      <h1 className="text-5xl font-bold mb-8">Enroll Batch</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Id</th>
            <th>Batch Name</th>
            <th>Technology</th>
            <th>Trainer Name</th>
            <th>Start Date</th>
            <th>Actions</th>
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
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    className="bg-green-700 hover:opacity-95"
                    onClick={handleShow}
                  >
                    Enroll
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Do you want to enroll in
                      <span className="ml-1">{batchname}</span> ?
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
