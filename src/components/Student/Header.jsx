import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <>
      <Navbar fixed="top" className="border-b bg-white">
        <Container>
          <Navbar.Brand href="/student">Student Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#myenrollments">My Enrollment</Nav.Link>
            <Nav.Link href="#enrollbatch">Enroll Batch</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
