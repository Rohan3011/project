import React from "react";
import { useLocation } from "react-router-dom";
import EnrollList from "../components/Student/EnrollList";
import Header from "../components/Student/Header";
import EnrollBatch from "../components/Student/EnrollBatch";
import Feedback from "../components/Student/Feedback";
import ProtectedRoutes from "../utils/ProtectedRoutes";

export default function Student() {
  const { hash } = useLocation();

  return (
    <>
      <ProtectedRoutes userType={"student"}>
        <Header />
        {hash == "#enrollbatch" ? (
          <EnrollBatch />
        ) : hash == "#feedback" ? (
          <Feedback />
        ) : (
          <EnrollList />
        )}
      </ProtectedRoutes>
    </>
  );
}
