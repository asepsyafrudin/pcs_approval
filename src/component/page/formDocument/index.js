import React, { Fragment, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { GlobalConsumer } from "../../../context/store";
import SectionTitle from "../../atom/sectionTitle";
import "./formDocument.css";
import { processId } from "../../../context/store/data";
import ModalConfirmation from "../../molekul/modalConfirmation";
import {
  APPROVAL_1,
  APPROVAL_2,
  EXITEDITDOCUMENT,
  REGISTERDOCUMENT,
  SAVEASDRAFT,
  SUBMIT,
} from "../../../context/const";
import { CapitalCaseFirstWord } from "../../../config/capitalCaseWord";
import { RiFileExcel2Fill } from "react-icons/ri";

function FormDocument(props) {
  const { dataSetApprovalUser, user, dataForApprovalDocument, dispatch } =
    props;
  const [approvalId, setApprovalID] = useState("");
  const [section, setSection] = useState("");
  const [noDocument, setNoDocument] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [typeRepresentative, setTypeRepresentative] = useState("");
  const [documentType, setDocumentType] = useState();
  const [processName, setProcessName] = useState("");
  const [file, setFile] = useState("");
  const [currentFile, setCurrentFile] = useState("");
  const [rev, setRev] = useState(0);
  const [remark, setRemark] = useState("");
  const [approval1, setApproval1] = useState("");
  const [approval2, setApproval2] = useState("");
  const [request, setRequest] = useState("");
  const [dataSend, setDataSend] = useState({});
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [alertSucess, setAlertSuccess] = useState(false);
  const [alertFailed, setAlertFailed] = useState(false);

  useEffect(() => {
    if (dataForApprovalDocument.length !== 0) {
      setApprovalID(dataForApprovalDocument.approvalId);
      setDocumentType(dataForApprovalDocument.typeDocument);
      setSection(dataForApprovalDocument.section);
      setProcessName(dataForApprovalDocument.processName);
      setNoDocument(dataForApprovalDocument.documentNumber);
      setPartNumber(dataForApprovalDocument.representativePartNumber);
      setTypeRepresentative(dataForApprovalDocument.representativeType);
      setRev(parseInt(dataForApprovalDocument.revision));
      setApproval1(dataForApprovalDocument.approval1UserId);
      setApproval2(dataForApprovalDocument.approval2UserId);
      setCurrentFile(dataForApprovalDocument.file);
      setRemark(dataForApprovalDocument.remark);
    } else {
      const date = new Date();
      const epd = `${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getMinutes()}${date.getSeconds()}`;
      setApprovalID(`EPD-${epd}`); //sample approval id
    }

    return () => {
      dispatch({ type: EXITEDITDOCUMENT });
    };
  }, []);

  const handleResetForm = () => {
    setSection("");
    setNoDocument("");
    setPartNumber("");
    setTypeRepresentative("");
    setDocumentType("");
    setProcessName("");
    setFile("");
    setRev(0);
    setRemark("");
    setApproval1("");
    setApproval2("");
  };

  const setData = () => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    let dateTime = date + " " + time;

    setDataSend({
      approvalId: approvalId,
      section: section,
      documentType: documentType,
      processName: processName,
      noDocument: noDocument,
      partNumber: partNumber,
      typeRepresentative: typeRepresentative,
      createdDate: dateTime,
      revision: rev,
      file: file ? file : currentFile,
      approval1UserId: approval1,
      approval2UserId: approval2,
      createdBy: user.userId,
      remark: remark,
      approval1Comment: "",
      approval2Comment: "",
      dateApproval1: "",
      dateApproval2: "",
    });
  };

  const handleSaveAsDraft = (e) => {
    e.preventDefault();
    setRequest(SAVEASDRAFT);
    setData();
    const dataCheck = [
      section,
      noDocument,
      partNumber,
      typeRepresentative,
      documentType,
      file,
      rev,
      approval1,
      approval2,
    ];

    let check = false;
    for (let index = 0; index < dataCheck.length; index++) {
      if (dataCheck[index] === "") {
        check = false;
        break;
      } else {
        check = true;
      }
    }
    if (check) {
      setShowModalConfirm(true);
    } else {
      setAlertFailed(true);
    }
  };

  const handleSaveForm = (e) => {
    e.preventDefault();
    setRequest(SUBMIT);
    setData();
    setShowModalConfirm(true);
  };

  const approvalList1 = () => {
    let option = [];
    const dataApproval1 = dataSetApprovalUser.filter(
      (value) => value.section === user.section && value.status === APPROVAL_1
    );

    if (approval1 === "") {
      for (let index = 0; index < dataApproval1.length; index++) {
        option.push(
          <option
            key={dataApproval1[index].id}
            value={dataApproval1[index].userId}
          >
            {dataApproval1[index].name}
          </option>
        );
      }
    } else {
      for (let index = 0; index < dataApproval1.length; index++) {
        if (
          dataApproval1[index].userId ===
          parseInt(dataForApprovalDocument.approval1UserId)
        ) {
          option.push(
            <option
              key={dataApproval1[index].id}
              value={dataApproval1[index].userId}
              selected
            >
              {dataApproval1[index].name}
            </option>
          );
        } else {
          option.push(
            <option
              key={dataApproval1[index].id}
              value={dataApproval1[index].userId}
            >
              {dataApproval1[index].name}
            </option>
          );
        }
      }
    }
    return option;
  };

  const approvalList2 = () => {
    const option = [];
    const dataApproval2 = dataSetApprovalUser.filter(
      (value) => value.section === user.section && value.status === APPROVAL_2
    );

    if (approval2 === "") {
      for (let index = 0; index < dataApproval2.length; index++) {
        option.push(
          <option
            key={dataApproval2[index].id}
            value={dataApproval2[index].userId}
          >
            {dataApproval2[index].name}
          </option>
        );
      }
    } else {
      for (let index = 0; index < dataApproval2.length; index++) {
        if (
          dataApproval2[index].userId ===
          parseInt(dataForApprovalDocument.approval2UserId)
        ) {
          option.push(
            <option
              key={dataApproval2[index].id}
              value={dataApproval2[index].userId}
              selected
            >
              {dataApproval2[index].name}
            </option>
          );
        } else {
          option.push(
            <option
              key={dataApproval2[index].id}
              value={dataApproval2[index].userId}
            >
              {dataApproval2[index].name}
            </option>
          );
        }
      }
    }
    return option;
  };

  const sectionList = [
    "sparkplug",
    "acgs",
    "o2sensor",
    "vct",
    "sifs",
    "alternator",
    "starter",
    "general",
  ];
  const optionMenuSection = () => {
    let option = [];
    if (section === "") {
      for (let index = 0; index < sectionList.length; index++) {
        option.push(
          <Fragment key={sectionList[index]}>
            <option key={sectionList[index]} value={sectionList[index]}>
              {sectionList[index].toUpperCase()}
            </option>
          </Fragment>
        );
      }
    } else {
      for (let index = 0; index < sectionList.length; index++) {
        if (section === sectionList[index]) {
          option.push(
            <Fragment key={sectionList[index]}>
              <option
                key={sectionList[index]}
                value={sectionList[index]}
                selected
              >
                {sectionList[index].toUpperCase()}
              </option>
            </Fragment>
          );
        } else {
          option.push(
            <Fragment key={sectionList[index]}>
              <option key={sectionList[index]} value={sectionList[index]}>
                {sectionList[index].toUpperCase()}
              </option>
            </Fragment>
          );
        }
      }
    }

    return option;
  };

  const handleSetDocumentType = (e) => {
    setDocumentType(e.target.value);
    if (documentType === "pcs") {
      setProcessName("");
    }
  };

  const processOption = () => {
    let option = [];
    if (processName === "") {
      for (let index = 0; index < processId.length; index++) {
        option.push(
          <Fragment key={processId[index].processId}>
            <option
              key={processId[index].processId}
              value={processId[index].processName}
            >
              {CapitalCaseFirstWord(processId[index].processName)}
            </option>
          </Fragment>
        );
      }
    } else {
      for (let index = 0; index < processId.length; index++) {
        if (processName === processId[index].processName) {
          option.push(
            <Fragment key={processId[index].processId}>
              <option
                key={processId[index].processId}
                value={processId[index].processName}
                selected
              >
                {CapitalCaseFirstWord(processId[index].processName)}
              </option>
            </Fragment>
          );
        } else {
          option.push(
            <Fragment key={processId[index].processId}>
              <option
                key={processId[index].processId}
                value={processId[index].processName}
              >
                {CapitalCaseFirstWord(processId[index].processName)}
              </option>
            </Fragment>
          );
        }
      }
    }

    return option;
  };

  const documentList = ["pcs", "pfmea", "qanet"];
  const optionMenuDocumentType = () => {
    let option = [];
    if (documentType === "") {
      for (let index = 0; index < documentList.length; index++) {
        option.push(
          <Fragment key={documentList[index]}>
            <option key={documentList[index]} value={documentList[index]}>
              {documentList[index].toUpperCase()}
            </option>
          </Fragment>
        );
      }
    } else {
      for (let index = 0; index < documentList.length; index++) {
        if (documentType === documentList[index]) {
          option.push(
            <Fragment key={documentList[index]}>
              <option
                key={documentList[index]}
                value={documentList[index]}
                selected
              >
                {documentList[index].toUpperCase()}
              </option>
            </Fragment>
          );
        } else {
          option.push(
            <Fragment key={documentList[index]}>
              <option key={documentList[index]} value={documentList[index]}>
                {documentList[index].toUpperCase()}
              </option>
            </Fragment>
          );
        }
      }
    }
    return option;
  };

  const handleSetFile = (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const extension = fileName.split(".").pop();
    const allowedExtensions = ["pdf"];
    if (allowedExtensions.includes(extension)) {
      // Upload file to the server
      setFile(file);
    } else {
      // Handle error
      window.alert(`Please upload ${allowedExtensions.join(", ")} files`);
    }
  };

  return (
    <div className="form-document">
      <SectionTitle title="Form E-Approval Document" />
      <div className="formdocument-container">
        <div>
          <Form onSubmit={handleSaveForm}>
            <Row>
              <Form.Group as={Col} controlId="approvalId">
                <Form.Label>E-Approval Number</Form.Label>
                <Form.Control type="text" disabled value={approvalId} />
              </Form.Group>
              <Form.Group as={Col} controlId="section_name">
                <Form.Label>Section Name</Form.Label>
                <Form.Select
                  defaultValue=""
                  required
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option value="" key="choose">
                    Choose...
                  </option>
                  {optionMenuSection()}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="document_type">
                <Form.Label>Type Document</Form.Label>
                <Form.Select
                  defaultValue=""
                  onChange={handleSetDocumentType}
                  required
                >
                  <option value="" key="choose">
                    Choose...
                  </option>
                  {optionMenuDocumentType()}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="process_name">
                <Form.Label>Process Name</Form.Label>
                <Form.Select
                  defaultValue=""
                  disabled={documentType === "pcs" ? false : true}
                  onChange={(e) => setProcessName(e.target.value)}
                  required
                >
                  <option value="" key="choose">
                    Choose ...
                  </option>
                  {processOption()}
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
                />
              </Form.Group>
              {dataForApprovalDocument.length !== 0 && (
                <Fragment key={"attachment"}>
                  <Col>
                    <Form.Group as={Col} controlId="type_representative">
                      <Form.Label>Current Attachment</Form.Label>
                      <a href={currentFile} style={{ display: "block" }}>
                        <Button variant="success">
                          <RiFileExcel2Fill />
                          Download Attachment
                        </Button>
                      </a>
                    </Form.Group>
                  </Col>
                </Fragment>
              )}
              <Form.Group as={Col} controlId="file">
                <Form.Label>
                  {dataForApprovalDocument.length !== 0
                    ? "Change Current File (*pdf)"
                    : "Upload File (*pdf)"}
                </Form.Label>
                <Form.Control
                  required={dataForApprovalDocument.length !== 0 ? false : true}
                  type="file"
                  placeholder="Search File"
                  onChange={handleSetFile}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="remark">
                <Form.Label>Remark</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </Form.Group>
              <Col>
                <Form.Group as={Col} controlId="document_type">
                  <Form.Label>Approval 1</Form.Label>
                  <Form.Select
                    defaultValue=""
                    onChange={(e) => setApproval1(e.target.value)}
                    required
                  >
                    <option value="" key="choose">
                      Choose...
                    </option>
                    {approvalList1()}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group as={Col} controlId="document_type">
                  <Form.Label>Approval 2</Form.Label>
                  <Form.Select
                    defaultValue=""
                    onChange={(e) => setApproval2(e.target.value)}
                    required
                  >
                    <option value="" key="choose">
                      Choose...
                    </option>
                    {approvalList2()}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <br />
            <Button
              variant="primary"
              size="sm"
              type="submit"
              id={SUBMIT}
              name={SUBMIT}
              key="submitButton"
            >
              Submit
            </Button>{" "}
            <Button
              variant="primary"
              size="sm"
              type="submit"
              id={SAVEASDRAFT}
              name={SAVEASDRAFT}
              value={SAVEASDRAFT}
              onClick={handleSaveAsDraft}
              key="savedraftbutton"
            >
              Save as Draft
            </Button>
          </Form>
          {alertSucess && (
            <Alert variant="success" key={"success"}>
              Success to {request}!!!
            </Alert>
          )}
          {alertFailed && (
            <Alert variant="danger" key={"danger"}>
              Please Check Your Input!!!
            </Alert>
          )}

          <ModalConfirmation
            title="Confirmation"
            command={REGISTERDOCUMENT}
            body={`Are you sure to ${request}`}
            dataSend={dataSend}
            request={request}
            onHandleShow={showModalConfirm}
            onHandleClose={(e) => setShowModalConfirm(e)}
            alertSuccess={(e) => setAlertSuccess(e)}
            onHandleResetFormRegisterUser={handleResetForm}
            key="modalconfirm"
          />
        </div>
      </div>
    </div>
  );
}

export default GlobalConsumer(FormDocument);
