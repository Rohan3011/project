import React from "react";
import { useLocation } from "react-router-dom";
import AssignedBatch from "../components/Trainer/AssignedBatch";
import FeedbackList from "../components/Trainer/FeedbackList";
import Header from "../components/Trainer/Header";
import ProtectedRoutes from "../utils/ProtectedRoutes";

export default function Trainer() {
  const { hash } = useLocation();

  return (
    <>
      <ProtectedRoutes userType={"trainer"}>
        <Header />
        {hash == "#feedback" ? <FeedbackList /> : <AssignedBatch />}
      </ProtectedRoutes>
    </>
  );
}
