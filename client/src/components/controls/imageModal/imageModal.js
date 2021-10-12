import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ImageModal() {
  const [show, setShow] = useState(false);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      animation={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title className="d-flex justify-content-center w-100"></Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
    </Modal>
  );
}
