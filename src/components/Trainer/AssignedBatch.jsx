import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiAlertFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BATCH_URL } from "../../api";
import AuthContext from "../../context/AuthProvider";

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
    batchname: "b1",
    techname: "java",
    trainername: "Xyz",
    startdate: new Date().toDateString(),
  },
  {
    id: 3,
    batchname: "b1",
    techname: "java",
    trainername: "Xyz",
    startdate: new Date().toDateString(),
  },
];

export default function AssignedBatch() {
  const { auth } = useContext(AuthContext);

  // Fetch Batchs
  const { isLoading, error, data } = useQuery({
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
          <h1 className="text-5xl font-bold mb-8">Assigned Batch</h1>
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
              {data
                ?.filter((val) => val.trainername == auth?.trainername)
                .map(({ id, batchname, techname, trainername, startdate }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{batchname}</td>
                    <td>{techname}</td>
                    <td>{trainername}</td>
                    <td>{startdate}</td>
                  </tr>
                ))}
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
      </div>
    </Container>
  );
}
