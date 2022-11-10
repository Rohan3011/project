import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { HiLogout } from "react-icons/hi";
import AuthContext from "../../context/AuthProvider";

export default function Logout() {
  const { setAuth } = useContext(AuthContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleLogout = () => {
    setAuth(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <button
        className="px-3 py-2 rounded text-white bg-red-600 transition-all duration-200 hover:opacity-95 flex items-center"
        onClick={handleShow}
      >
        <HiLogout className="mr-2" />
        Logout
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you're sure, you want to logout ?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="bg-gray-500  hover:opacity-95"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <button
            className="px-3 py-2 rounded text-white bg-red-600 transition-all duration-200 hover:opacity-95 flex items-center"
            onClick={handleLogout}
          >
            Logout
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
