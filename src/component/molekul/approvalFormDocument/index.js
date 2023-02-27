import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Form, Row, Table } from "react-bootstrap";
import { GlobalConsumer } from "../../../context/store";
import "./approvalFormDocument.css";
import { processId } from "../../../context/store/data";
import {
  DOCUMENTCOMPLETE,
  DOCUMENTDRAFT,
  DOCUMENTREJECT,
  EXITEDITDOCUMENT,
  SAVEASDRAFT,
  WAITINGAPPROVAL1,
  WAITINGAPPROVAL2,
} from "../../../context/const";
import { CapitalCaseFirstWord } from "../../../config/capitalCaseWord";
import { RiFileExcel2Fill } from "react-icons/ri";
import ApprovalComment from "../../atom/approvalComment";
import ApprovalForm from "../../atom/approvalForm";
import axios from "axios";
import { GET_USER_API } from "../../../config/api";

function ApprovalFormDocument(props) {
  const { dataForApprovalDocument, user, actionState, dispatch } = props;
  const [approvalId, setApprovalID] = useState("");
  const [section, setSection] = useState("");
  const [noDocument, setNoDocument] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [typeRepresentative, setTypeRepresentative] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [processName, setProcessName] = useState("");
  const [file, setFile] = useState("");
  const [rev, setRev] = useState(0);
  const [remark, setRemark] = useState("");
  const [approval1Comment, setApproval1Comment] = useState("");
  const [dateApproval1, setDateApproval1] = useState("");
  const [approval2Comment, setApproval2Comment] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [userApproval1, setUserApproval1] = useState({});
  const [userApproval2, setUserApproval2] = useState({});
  const [dateApproval2, setDateApproval2] = useState("");
  const [documentStatus, setDocumentStatus] = useState("");
  const [showApprovalForm, setShowApprovalForm] = useState(false);

  useEffect(() => {
    dispatch({
      type: "setTitleHeader",
      payload: "E-Approval Document & Centralization",
    });
    setApprovalID(dataForApprovalDocument.approvalId);
    setDocumentType(dataForApprovalDocument.typeDocument);
    setSection(dataForApprovalDocument.section);
    setProcessName(dataForApprovalDocument.processName);
    setNoDocument(dataForApprovalDocument.documentNumber);
    setPartNumber(dataForApprovalDocument.representativePartNumber);
    setTypeRepresentative(dataForApprovalDocument.representativeType);
    setRev(parseInt(dataForApprovalDocument.revision));
    setFile(dataForApprovalDocument.file);
    setRemark(dataForApprovalDocument.remark);
    setApproval1Comment(dataForApprovalDocument.approval1Comment);
    setApproval2Comment(dataForApprovalDocument.approval2Comment);
    setDocumentStatus(dataForApprovalDocument.documentStatus);
    setDateApproval1(dataForApprovalDocument.dateApproval1);
    setDateApproval2(dataForApprovalDocument.dateApproval2);

    return () => {
      dispatch({ type: EXITEDITDOCUMENT });
    };
  }, []);

  useEffect(() => {
    if (documentStatus === WAITINGAPPROVAL1) {
      if (parseInt(dataForApprovalDocument.approval1UserId) === user.userId) {
        setShowApprovalForm(true);
      } else {
        setShowApprovalForm(false);
      }
    } else if (documentStatus === WAITINGAPPROVAL2) {
      if (parseInt(dataForApprovalDocument.approval2UserId) === user.userId) {
        setShowApprovalForm(true);
      } else {
        setShowApprovalForm(false);
      }
    }
  }, [documentStatus]);

  useEffect(() => {
    axios
      .get(GET_USER_API)
      .then((response) => {
        const dataUser = response.data;
        const userApproval1 = dataUser.find(
          (value) =>
            value.userId === parseInt(dataForApprovalDocument.approval1UserId)
        );
        const userApproval2 = dataUser.find(
          (value) =>
            value.userId === parseInt(dataForApprovalDocument.approval2UserId)
        );
        const createdUser = dataUser.find(
          (value) =>
            value.userId === parseInt(dataForApprovalDocument.createdBy)
        );
        setCreatedBy(createdUser);
        setUserApproval1(userApproval1);
        setUserApproval2(userApproval2);
      })
      .catch((error) => console.log(error));
  }, [actionState]);

  const handleSetDocumentType = (e) => {
    setDocumentType(e.target.value);
    if (documentType === "pcs") {
      setDisableProcess(false);
      setProcessName("");
    }
  };

  const statusDocumentColor = () => {
    let color = "";
    if (
      documentStatus === WAITINGAPPROVAL1 ||
      documentStatus === WAITINGAPPROVAL2
    ) {
      color = "warning";
    } else if (documentStatus === DOCUMENTREJECT) {
      color = "danger";
    } else if (documentStatus === DOCUMENTDRAFT) {
      color = "secondary";
    } else {
      color = "success";
    }

    return color;
  };

  const imageUserAndApproval = (url) => {
    return (
      <img
        src={url ? url : require("../../../asset/image/profile.jpg")}
        alt="photo"
        style={{ maxWidth: 150, maxHeight: 250 }}
        key="photo"
      />
    );
  };

  const approvalStatus = () => {
    let approval = [];
    if (dateApproval2) {
      if (documentStatus === DOCUMENTCOMPLETE) {
        approval.push(
          <>
            <td>
              <Badge bg="success" key="approve1">
                APPROVE
              </Badge>
            </td>
            <td>
              <Badge bg="success" key="approve2">
                APPROVE
              </Badge>
            </td>
          </>
        );
      } else {
        approval.push(
          <>
            <td>
              <Badge bg="success" key="approve1">
                APPROVE
              </Badge>
            </td>
            <td>
              <Badge bg="success" key="approve2">
                REJECT
              </Badge>
            </td>
          </>
        );
      }
    } else if (dateApproval1) {
      if (documentStatus === WAITINGAPPROVAL2) {
        approval.push(
          <>
            <td>
              <Badge bg="success" key="approve1">
                APPROVE
              </Badge>
            </td>
            <td>
              <Badge bg="warning" key="approve2">
                WAITING APPROVAL
              </Badge>
            </td>
          </>
        );
      } else {
        approval.push(
          <>
            <td>
              <Badge bg="danger" key="approve1">
                REJECT
              </Badge>
            </td>
            <td>
              <Badge bg="danger" key="approve2">
                NOT PROCESSING
              </Badge>
            </td>
          </>
        );
      }
    } else {
      approval.push(
        <>
          <td>
            <Badge bg="warning" key="approve1">
              WAITING APPROVAL
            </Badge>
          </td>
          <td>
            <Badge bg="warning" key="approve2">
              WAITING APPROVAL
            </Badge>
          </td>
        </>
      );
    }
    return approval;
  };

  return (
    <div className="formdocument-container-approval">
      <div>
        <h3>
          <Badge bg={statusDocumentColor()}>
            {documentStatus === DOCUMENTCOMPLETE
              ? "Status Document Complete"
              : `Status Document ${CapitalCaseFirstWord(documentStatus)}`}
          </Badge>
        </h3>
        <Form>
          <Row>
            <Form.Group as={Col} controlId="approvalId">
              <Form.Label>E-Approval Number</Form.Label>
              <Form.Control type="text" disabled value={approvalId} />
            </Form.Group>
            <Form.Group as={Col} controlId="section_name">
              <Form.Label>Section Name</Form.Label>
              <Form.Select
                defaultValue={section}
                required
                disabled
                onChange={(e) => setSection(e.target.value)}
              >
                <option value={section} key="choose">
                  {section}
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="document_type">
              <Form.Label>Type Document</Form.Label>
              <Form.Select
                defaultValue={documentType}
                onChange={handleSetDocumentType}
                required
                disabled
              >
                <option value={documentType} key="choose">
                  {documentType}
                </option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="process_name">
              <Form.Label>Process Name</Form.Label>
              <Form.Select
                defaultValue={processName}
                disabled
                onChange={(e) => setProcessName(e.target.value)}
                required
              >
                <option value={processName} key="choose">
                  {processName}
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="no_document">
              <Form.Label>No Document</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Document Number"
                value={noDocument}
                onChange={(e) => setNoDocument(e.target.value)}
                required
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} controlId="part_number_representative">
              <Form.Label>Part Number Representative</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Part Number"
                value={partNumber}
                onChange={(e) => setPartNumber(e.target.value)}
                required
                disabled
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="type_representative">
              <Form.Label>Type Representative</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Type "
                value={typeRepresentative}
                onChange={(e) => setTypeRepresentative(e.target.value)}
                required
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} controlId="revision">
              <Form.Label>Revision</Form.Label>
              <Form.Control
                type="number"
                value={rev}
                onChange={(e) => setRev(e.target.value)}
                placeholder="Enter Revision"
                required
                disabled
              />
            </Form.Group>
            <Col>
              <Form.Group as={Col} controlId="type_representative">
                <Form.Label>Attachment</Form.Label>
                <a href={file} style={{ display: "block" }}>
                  <Button variant="success" key={"success"}>
                    <RiFileExcel2Fill />
                    Download Attachment
                  </Button>
                </a>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="remark">
              <Form.Label>Remark</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                disabled
              />
            </Form.Group>
          </Row>
          <br />
          <hr />
          {/* form feedback */}
          {approval1Comment !== "" && (
            <ApprovalComment
              comment={approval1Comment ? approval1Comment : ""}
              label={`Notes from
                ${userApproval1.name} at ${dateApproval1}`}
              key="approval1Comment"
            />
          )}
          {approval2Comment !== "" && (
            <ApprovalComment
              comment={approval2Comment ? approval2Comment : ""}
              label={`Notes from ${userApproval2.name} at ${dateApproval2}`}
              key="approval2Comment"
            />
          )}
          {showApprovalForm && (
            <ApprovalForm
              idDocument={dataForApprovalDocument.approvalId}
              documentStatus={dataForApprovalDocument.documentStatus}
              key={dataForApprovalDocument.approvalId}
            />
          )}
        </Form>
        <hr />
        <Table bordered style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <td>Wrote by</td>
              <td>Approval 1</td>
              <td>Approval 2</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{imageUserAndApproval(createdBy.photo)}</td>
              <td>{imageUserAndApproval(userApproval1.photo)}</td>
              <td>{imageUserAndApproval(userApproval2.photo)}</td>
            </tr>
            <tr>
              <td>{createdBy.name}</td>
              <td>{userApproval1.name}</td>
              <td>{userApproval2.name}</td>
            </tr>
            <tr>
              <td>{dataForApprovalDocument.createdDate}</td>
              <td>{dateApproval1}</td>
              <td>{dateApproval2}</td>
            </tr>
            <tr>
              <td></td>
              {documentStatus !== SAVEASDRAFT && approvalStatus()}
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default GlobalConsumer(ApprovalFormDocument);
