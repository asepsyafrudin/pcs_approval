import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { CapitalCaseFirstWord } from "../../../config/capitalCaseWord";
import { APPROVAL_1, REGISTERAPPROVAL } from "../../../context/const";
import { GlobalConsumer } from "../../../context/store";

function ModalFormSetApproval(props) {
  const {
    title,
    onHandleShow,
    onHandleClose,
    dispatch,
    command,
    dataUser,
    ...rest
  } = props;
  const [section, setSection] = useState("");
  const [userId, setUserId] = useState("");

  const handleClose = () => {
    onHandleClose(false);
  };

  const handleResetForm = () => {
    setSection("");
    setUserId("");
  };

  const HandleOk = () => {
    onHandleClose(false);
    if (section !== "" && userId !== "") {
      let data = {
        section: section,
        userId: userId,
        status: command,
      };
      dispatch({ type: REGISTERAPPROVAL, payload: data });
      handleResetForm();
    } else {
      window.alert("Form Ada yang kosong!!!");
    }
  };

  const sectionList = [
    "sparkplug",
    "acgs",
    "o2sensor",
    "sifs",
    "vct",
    "wss",
    "alternator",
    "starter",
    "general",
  ];
  const optionMenuSection = () => {
    let option = [];
    for (let index = 0; index < sectionList.length; index++) {
      option.push(
        <option value={sectionList[index]} key={sectionList[index]}>
          {CapitalCaseFirstWord(sectionList[index])}
        </option>
      );
    }
    return option;
  };

  const optionMenuUser = () => {
    let option = [];
    if (dataUser) {
      for (let index = 0; index < dataUser.length; index++) {
        option.push(
          <option value={dataUser[index].userId} key={dataUser[index].userId}>
            {CapitalCaseFirstWord(dataUser[index].name)}
          </option>
        );
      }
    }

    return option;
  };

  return (
    <>
      <Modal show={onHandleShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Form.Group as={Col} controlId="section">
                <Form.Label>Section</Form.Label>
                <Form.Select
                  defaultValue=""
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option value="">Choose...</option>
                  {optionMenuSection()}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="user">
                <Form.Label>Name</Form.Label>
                <Form.Select
                  defaultValue=""
                  onChange={(e) => setUserId(e.target.value)}
                >
                  <option value="">Choose...</option>
                  {optionMenuUser()}
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={HandleOk}>
            Save
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GlobalConsumer(ModalFormSetApproval);
