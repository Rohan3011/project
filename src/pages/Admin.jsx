import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import BatchList from "../components/Admin/BatchList";
import CreateBatch from "../components/Admin/CreateBatch";
import EnrollList from "../components/Admin/EnrollList";
import Header from "../components/Admin/Header";

export default function Admin() {
  const { hash } = useLocation();

  return (
    <div>
      <Header />
      {hash == "#createbatch" ? (
        <CreateBatch />
      ) : hash == "#enrolllist" ? (
        <EnrollList />
      ) : (
        <BatchList />
      )}
    </div>
  );
}
