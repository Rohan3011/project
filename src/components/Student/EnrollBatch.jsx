import React, { useContext, useState } from "react";
import { ADD_ENROLL_URL, BATCH_URL, ENROLL_URL } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { Button, Container, Modal, Spinner, Table } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiAlertFill } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { auth } = useContext(AuthContext);

  const handleEnroll = async (val) => {
    try {
      setLoading(true);
      setErrorMsg("");
      const response = await fetch(ADD_ENROLL_URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          batchname: val?.batchname,
          techname: val?.techname,
          trainername: val?.trainername,
          startDate: val?.startdate,
          studentname: auth?.studentname,
        }),
      });
      refetch();
    } catch (error) {
      console.log(error);
      setErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["enrollbatch"],
    queryFn: () => fetch(BATCH_URL).then((res) => res.json()),
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
              {data.map(
                ({ id, batchname, techname, trainername, startdate }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{batchname}</td>
                    <td>{techname}</td>
                    <td>{trainername}</td>
                    <td>{startdate}</td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        className="bg-green-700 hover:opacity-95"
                        onClick={() =>
                          handleEnroll({
                            id,
                            batchname,
                            techname,
                            trainername,
                            startdate,
                          })
                        }
                      >
                        Enroll
                      </Button>
                    </td>
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
          <Link
            className="text-blue-700 underline "
            to={"/student#enrollbatch"}
          >
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
        <h1 className="text-5xl font-bold text-center mb-3">No Enroll Batch</h1>
      </div>
    </Container>
  );
}
