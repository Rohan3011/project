import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { HiAcademicCap } from "react-icons/hi";
import Logout from "../shared/Logout";

export default function Header() {
  return (
    <>
      <Navbar fixed="top" variant="primary" bg="light" className="border-b">
        <Container>
          <Navbar.Brand className="flex items-end" href="/student">
            <HiAcademicCap className="w-6 h-6 mr-2" />
            <span className=" text-xl font-semibold"> Student</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#myenrollments">My Enrollment</Nav.Link>
            <Nav.Link href="#enrollbatch">Enroll Batch</Nav.Link>
            <Nav.Link href="#feedback">Feedback</Nav.Link>
          </Nav>
          <div className="ml-auto">
            <Logout />
          </div>
        </Container>
      </Navbar>
    </>
  );
}
