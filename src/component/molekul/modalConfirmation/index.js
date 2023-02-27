import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import {
  DELETEAPPROVALUSER,
  DELETEUSER,
  DOCUMENTAPPROVE,
  DOCUMENTAPPROVE_1,
  DOCUMENTAPPROVE_2,
  DOCUMENTREJECT,
  REGISTERDOCUMENT,
  SAVEASDRAFT,
  SUBMIT,
  WAITINGAPPROVAL1,
} from "../../../context/const";
import { GlobalConsumer } from "../../../context/store";

function ModalConfirmation(props) {
  const [documentDataToApprove, setDocumentDataToApprove] = useState("");
  const {
    command,
    title,
    idToDelete,
    body,
    onHandleShow,
    onHandleClose,
    dispatch,
    dataSend,
    alertSuccess,
    onHandleResetFormRegisterUser,
    request,
    idDocumentToApprove,
    totalListApproval,
    ...rest
  } = props;

  useEffect(() => {
    const data = totalListApproval.find(
      (value) => value.approvalId === idDocumentToApprove
    );
    setDocumentDataToApprove(data);
  }, []);

  const handleClose = () => {
    onHandleClose(false);
  };

  const navigate = useNavigate();

  const HandleOk = () => {
    switch (command) {
      case DELETEUSER:
        dispatch({ type: DELETEUSER, payload: idToDelete });
        onHandleClose(false);
        break;

      case DELETEAPPROVALUSER:
        dispatch({ type: DELETEAPPROVALUSER, payload: idToDelete });
        onHandleClose(false);
        break;

      case REGISTERDOCUMENT:
        let formData = new FormData();
        formData.append("approvalId", dataSend.approvalId);
        formData.append("section", dataSend.section);
        formData.append("typeDocument", dataSend.documentType);
        formData.append("processName", dataSend.processName);
        formData.append("documentNumber", dataSend.noDocument);
        formData.append("representativePartNumber", dataSend.partNumber);
        formData.append("representativeType", dataSend.typeRepresentative);
        formData.append("revision", dataSend.revision);
        formData.append("file", dataSend.file);
        formData.append("createdDate", dataSend.createdDate);
        formData.append("approval1UserId", dataSend.approval1UserId);
        formData.append("approval2UserId", dataSend.approval2UserId);
        formData.append("createdBy", dataSend.createdBy);
        if (request === SUBMIT) {
          formData.append("documentStatus", WAITINGAPPROVAL1);
        } else {
          formData.append("documentStatus", SAVEASDRAFT);
        }
        formData.append("remark", dataSend.remark);
        formData.append("approval1Comment", dataSend.approval1Comment);
        formData.append("approval2Comment", dataSend.approval2Comment);
        formData.append("dateApproval1", dataSend.dateApproval1);
        formData.append("dateApproval2", dataSend.approval2Comment);
        dispatch({ type: REGISTERDOCUMENT, payload: formData });
        onHandleClose(false);
        alertSuccess(true);
        onHandleResetFormRegisterUser();
        setTimeout(() => {
          navigate("/home");
        }, 4000);
        break;

      case DOCUMENTAPPROVE:
        dispatch({
          type:
            documentDataToApprove.documentStatus === WAITINGAPPROVAL1
              ? DOCUMENTAPPROVE_1
              : DOCUMENTAPPROVE_2,
          payload: { id: idDocumentToApprove, data: dataSend },
        });
        onHandleClose(false);
        alertSuccess(true);
        setTimeout(() => {
          navigate("/home");
        }, 4000);
        break;

      case DOCUMENTREJECT:
        dispatch({
          type:
            documentDataToApprove.documentStatus === WAITINGAPPROVAL1
              ? DOCUMENTAPPROVE_1
              : DOCUMENTAPPROVE_2,
          payload: { id: idDocumentToApprove, data: dataSend },
        });
        onHandleClose(false);
        alertSuccess(true);
        setTimeout(() => {
          navigate("/home");
        }, 4000);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Modal show={onHandleShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={HandleOk}>
            OK
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GlobalConsumer(ModalConfirmation);
