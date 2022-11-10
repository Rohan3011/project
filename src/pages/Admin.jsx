import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import BatchList from "../components/Admin/BatchList";
import CreateBatch from "../components/Admin/CreateBatch";
import EnrollList from "../components/Admin/EnrollList";
import Header from "../components/Admin/Header";
import ProtectedRoutes from "../utils/ProtectedRoutes";

export default function Admin() {
  const { hash } = useLocation();

  return (
    <>
      <ProtectedRoutes userType={"admin"}>
        <Header />
        {hash == "#createbatch" ? (
          <CreateBatch />
        ) : hash == "#enrolllist" ? (
          <EnrollList />
        ) : (
          <BatchList />
        )}
      </ProtectedRoutes>
    </>
  );
}
