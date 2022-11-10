import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <>
      <Navbar fixed="top" className="border-b bg-white">
        <Container>
          <Navbar.Brand href="/trainer">Trainer Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#batchlist">Batch List</Nav.Link>
            <Nav.Link href="#feedback">Feedback</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
