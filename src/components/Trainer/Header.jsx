import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function Header() {
  return (
    <>
      <Navbar fixed="top" className="border-b bg-white">
        <Container>
          <Navbar.Brand className="flex items-end" href="/trainer">
            <FaChalkboardTeacher className="w-6 h-6 mr-2" />
            <span className=" text-xl font-semibold"> Trainer</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#assignedbatch">Assigned Batch</Nav.Link>
            <Nav.Link href="#feedback">Feedback</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}