import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { HiAcademicCap } from "react-icons/hi";

export default function Header() {
  return (
    <>
      <Navbar fixed="top" className="border-b bg-white">
        <Container>
          <Navbar.Brand className="flex items-end" href="/student">
            <HiAcademicCap className="w-6 h-6 mr-2" />
            <span className=" text-xl font-semibold"> Student</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#myenrollments">My Enrollment</Nav.Link>
            <Nav.Link href="#enrollbatch">Enroll Batch</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
