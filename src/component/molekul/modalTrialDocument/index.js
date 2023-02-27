import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

function ModalTrialDocument(props) {
  const { onHandleShow, onHandleClose } = props;
  const [docDescription, setDocDescription] = useState("");
  const [file, setFile] = useState("");

  const handleClose = () => {
    onHandleClose(false);
    handleResetForm();
  };

  const handleResetForm = () => {
    setDocDescription("");
    setFile("");
  };

  const uploadFiles = (e) => {
    e.preventDefault();
    onHandleClose(false);
    handleResetForm();
  };

  const HandleOk = () => {};
  return (
    <>
      <Modal show={onHandleShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Trial Upload File</Modal.Title>
        </Modal.Header>
        <Form onSubmit={uploadFiles}>
          <Modal.Body>
            <Row>
              <Form.Group as={Col} controlId="section">
                <Form.Label>Document Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={docDescription}
                  placeholder="Enter Description"
                  onChange={(e) => setDocDescription(e.target.value)}
                />
              </Form.Group>
            </Row>
            <br />
            <Row>
              <Form.Group as={Col} controlId="user">
                <Form.Label>File Upload</Form.Label>
                <Form.Control
                  required
                  type="file"
                  placeholder="Upload File"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="submit " onClick={HandleOk}>
              Upload File
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalTrialDocument;
