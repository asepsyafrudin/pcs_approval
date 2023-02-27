import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import {
  DOCUMENTAPPROVE,
  DOCUMENTCOMPLETE,
  DOCUMENTREJECT,
  WAITINGAPPROVAL1,
  WAITINGAPPROVAL2,
} from "../../../context/const";
import { GlobalConsumer } from "../../../context/store";
import ModalConfirmation from "../../molekul/modalConfirmation";

function ApprovalForm(props) {
  const { idDocument, documentStatus } = props;
  const [file, setFile] = useState("");
  const [dataSend, setDataSend] = useState("");
  const [comment, setComment] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [command, setCommand] = useState("");
  const [handleShowModalConfirm, setHandleShowModalConfirm] = useState(false);

  const currentDate = () => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    let dateTime = date + " " + time;
    return dateTime;
  };

  const setData = (request) => {
    let formData = new FormData();
    if (!file) {
      formData.append("file", file);
    }
    if (documentStatus === WAITINGAPPROVAL1) {
      formData.append("approval1Comment", comment);
      formData.append("dateApproval1", currentDate());
      if (request === DOCUMENTAPPROVE) {
        formData.append("documentStatus", WAITINGAPPROVAL2);
      } else {
        formData.append("documentStatus", DOCUMENTREJECT);
      }
    } else {
      formData.append("approval2Comment", comment);
      formData.append("dateApproval2", currentDate());
      if (request === DOCUMENTAPPROVE) {
        formData.append("documentStatus", DOCUMENTCOMPLETE);
      } else {
        formData.append("documentStatus", DOCUMENTREJECT);
      }
    }
    return formData;
  };

  const handleApproveDocument = (e) => {
    if (e.target.id === DOCUMENTAPPROVE) {
      setCommand(DOCUMENTAPPROVE);
      setDataSend(setData(DOCUMENTAPPROVE));
      setHandleShowModalConfirm(true);
    } else {
      setCommand(DOCUMENTREJECT);
      setDataSend(setData(DOCUMENTREJECT));
      setHandleShowModalConfirm(true);
    }
  };

  return (
    <>
      <Row>
        <Form.Group as={Col} controlId="file">
          <Form.Label>File Upload</Form.Label>
          <Form.Control
            type="file"
            placeholder="choose file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>
        <Col />
        <Col />
      </Row>
      <Row>
        <Form.Group as={Col} controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
      </Row>
      <br />
      <Row>
        <Col>
          <Button
            variant="primary"
            id={DOCUMENTAPPROVE}
            onClick={handleApproveDocument}
          >
            Approve
          </Button>{" "}
          <Button
            variant="danger"
            id={DOCUMENTREJECT}
            onClick={handleApproveDocument}
          >
            Reject
          </Button>
        </Col>
        <Col />
        <Col />
      </Row>
      <Row>
        {alertSuccess && (
          <Alert variant="success" key={"success"}>
            Success to {command}!!!
          </Alert>
        )}
      </Row>
      <ModalConfirmation
        onHandleShow={handleShowModalConfirm}
        command={command}
        dataSend={dataSend}
        alertSuccess={(e) => setAlertSuccess(e)}
        title="Confirmation"
        body={`Do you want to ${command}`}
        idDocumentToApprove={idDocument}
        onHandleClose={(e) => setHandleShowModalConfirm(e)}
      />
    </>
  );
}

export default GlobalConsumer(ApprovalForm);
