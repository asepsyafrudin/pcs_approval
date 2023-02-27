import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function ApprovalComment(props) {
  const { label, comment } = props;
  return (
    <>
      <Row>
        <Form.Group as={Col} controlId="comment">
          <Form.Label>{label}</Form.Label>
          <Form.Control as="textarea" rows={2} value={comment} disabled />
        </Form.Group>
      </Row>
      <hr />
    </>
  );
}

export default ApprovalComment;
