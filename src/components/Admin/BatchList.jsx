import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Modal, Spinner, Table } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiAlertFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BATCH_URL, ENROLL_URL } from "../../api";

const dummy = [
  {
    id: 1,
    batchname: "b1",
    techname: "java",
    trainername: "Xyz",
    startdate: new Date().toDateString(),
  },
  {
    id: 2,
    batchname: "b2",
    techname: "java",
    trainername: "Xyz",
    startdate: new Date().toDateString(),
  },
  {
    id: 3,
    batchname: "b3",
    techname: "java",
    trainername: "Xyz",
    startdate: new Date().toDateString(),
  },
];

export default function BatchList() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    fetch(BATCH_URL + id, {
      method: "DELETE",
    })
      .then(() => refetch())
      .catch((err) => setErrorMsg(err));
  };

  // Fetch Batchs
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["fetchBatch"],
    queryFn: () => fetch(BATCH_URL).then((res) => res.json()),
  });

  if (isLoading)
    return (
      <Container className="mt-20 w-full flex justify-center items-center">
        <Spinner variant="primary" />
      </Container>
    );
  if (error) return <BatchFailed />;

  return (
    <>
      {data ? (
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map(
                ({ id, batchname, techname, trainername, startdate }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{batchname}</td>
                    <td>{techname}</td>
                    <td>{trainername}</td>
                    <td>{startdate}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        className="bg-red-600 hover:opacity-95"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Container>
      ) : (
        <BatchEmpty />
      )}
    </>
  );
}

function BatchFailed() {
  return (
    <Container className="w-full h-full mt-20 bg-red-50 rounded shadow">
      <div className=" pt-8 pb-10 flex flex-col gap-6  items-center">
        <AiFillCloseCircle className="text-5xl text-red-700" />
        <h1 className="text-5xl font-bold text-center mb-3">
          Failed to fetch batch!
        </h1>
        <span className="text-lg text-center font-semibold">
          Try{" "}
          <Link className="text-blue-700 underline " to={"/trainer"}>
            refresh
          </Link>{" "}
        </span>
      </div>
    </Container>
  );
}

function BatchEmpty() {
  return (
    <Container className="w-full h-full mt-20 bg-yellow-50 rounded shadow">
      <div className=" pt-8 pb-10 flex flex-col gap-6  items-center">
        <RiAlertFill className="text-5xl text-yellow-700" />
        <h1 className="text-5xl font-bold text-center mb-3">
          Batch List is Emtpy!
        </h1>
        <span className="text-lg text-center font-semibold">
          Try{" "}
          <Link className="text-blue-700 underline " to={"/admin#createbatch"}>
            create batch
          </Link>{" "}
        </span>
      </div>
    </Container>
  );
}
