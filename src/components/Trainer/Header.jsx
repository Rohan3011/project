import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaChalkboardTeacher } from "react-icons/fa";
import Logout from "../shared/Logout";

export default function Header() {
  return (
    <>
      <Navbar fixed="top" variant="primary" bg="light" className="border-b">
        <Container>
          <Navbar.Brand className="flex items-end" href="/trainer">
            <FaChalkboardTeacher className="w-6 h-6 mr-2" />
            <span className=" text-xl font-semibold"> Trainer</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#assignedbatch">Assigned Batch</Nav.Link>
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
