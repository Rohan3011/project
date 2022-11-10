import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { MdAdminPanelSettings } from "react-icons/md";
import Logout from "../shared/Logout";

export default function Header() {
  return (
    <>
      <Navbar fixed="top" cvariant="primary" bg="light" className="border-b">
        <Container className="">
          <Navbar.Brand
            className="flex items-center space-x-4 text-xl font-semibold"
            href="/admin"
          >
            <MdAdminPanelSettings className="w-8 h-8" />
            Dashboard
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#batchlist">Batch List</Nav.Link>
            <Nav.Link href="#createbatch">Create Batch</Nav.Link>
            <Nav.Link href="#enrolllist">Enroll List</Nav.Link>
          </Nav>
          <div className="ml-auto">
            <Logout />
          </div>
        </Container>
      </Navbar>
    </>
  );
}
