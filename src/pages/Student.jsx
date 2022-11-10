import React from "react";
import { useLocation } from "react-router-dom";
import EnrollList from "../components/Student/EnrollList";
import Header from "../components/Student/Header";
import EnrollBatch from "../components/Student/EnrollBatch";

export default function Student() {
  const { hash } = useLocation();

  return (
    <div>
      <Header />
      {hash == "#enrollbatch" ? <EnrollBatch /> : <EnrollList />}
    </div>
  );
}
