import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { CapitalCaseFirstWord } from "../../../config/capitalCaseWord";
import { SAVEUSERS, UPDATEUSER } from "../../../context/const";
import { GlobalConsumer } from "../../../context/store";

function FormRegisterUser(props) {
  const {
    dispatch,
    fotoProfile,
    handleResetFotoProfile,
    dataUser,
    dataEdit,
    onHandleCancelEdit,
    onHandleDisabledNpk,
    onHandleCancelDisabledNpk,
  } = props;
  const [npk, setNpk] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [section, setSection] = useState("");
  const [position, setPosition] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertBerhasil, setAlertBehasil] = useState(false);

  useEffect(() => {
    if (dataEdit) {
      setNpk(dataEdit.npk);
      setName(dataEdit.name);
      setPassword(dataEdit.password);
      setEmail(dataEdit.email);
      setSection(dataEdit.section);
      setPosition(dataEdit.position);
    }
  }, [dataEdit]);

  const handleSelectedSection = (e) => {
    setSection(e.target.value);
  };

  const handleSelectedPosition = (e) => {
    setPosition(e.target.value);
  };

  const OnChangeForm = (e) => {
    e.target.id === "npk" && setNpk(e.target.value);
    e.target.id === "userName" && setName(e.target.value);
    e.target.id === "password" && setPassword(e.target.value);
    e.target.id === "email" && setEmail(e.target.value);
  };

  const resetForm = () => {
    setName("");
    setNpk("");
    setPassword("");
    setEmail("");
    setPosition("");
    setSection("");
    onHandleCancelEdit();
    onHandleCancelDisabledNpk();
    setAlertBehasil(true);
    setAlert(false);
  };

  const handleSaveForm = (e) => {
    e.preventDefault();
    const dataCheck = () => {
      const arrayData = [name, npk, password, section, position, email];
      for (let i = 0; i < arrayData.length; i++) {
        if (arrayData[i] === "") {
          return false; //data ada yang belum terisi
        }
        return true; //data sudah terisi semua
      }
    };
    if (dataCheck()) {
      if (dataEdit.npk !== "") {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("npk", npk);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("section", section);
        formData.append("position", position);
        formData.append("photo", fotoProfile);
        dispatch({ type: UPDATEUSER, payload: formData });
        handleResetFotoProfile("");
        //handleResetForm
        resetForm();
      } else {
        let findDataUser = dataUser.find(
          (value) => value.npk === parseInt(npk)
        );
        if (!findDataUser) {
          let formData = new FormData();
          formData.append("name", name);
          formData.append("npk", npk);
          formData.append("email", email);
          formData.append("section", section);
          formData.append("position", position);
          formData.append("photo", fotoProfile);
          formData.append("password", password);
          dispatch({ type: SAVEUSERS, payload: formData });
          handleResetFotoProfile("");
          //handleResetForm
          resetForm();
        } else {
          window.alert("NPK sudah terdaftar");
        }
      }
    } else {
      setAlert(true);
      setAlertBehasil(false);
    }
  };

  const handleCancelUpdate = () => {
    onHandleCancelEdit();
    onHandleCancelDisabledNpk();
    setName("");
    setNpk("");
    setPassword("");
    setEmail("");
    setSection("");
    setPosition("");
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
    for (let index = 0; index < sectionList.length; index++) {
      if (sectionList[index] === section) {
        option.push(
          <option value={sectionList[index]} selected key={sectionList[index]}>
            {CapitalCaseFirstWord(sectionList[index])}
          </option>
        );
      } else {
        option.push(
          <option value={sectionList[index]} key={sectionList[index]}>
            {CapitalCaseFirstWord(sectionList[index])}
          </option>
        );
      }
    }
    return option;
  };

  const positionList = [
    "admin",
    "staff",
    "assisten manager",
    "manager",
    "department manager",
    "assisten general manager",
    "general manager",
    "director",
  ];
  const optionMenuPosition = () => {
    let option = [];
    for (let index = 0; index < positionList.length; index++) {
      if (positionList[index] === position) {
        option.push(
          <option
            value={positionList[index]}
            selected
            key={positionList[index]}
          >
            {CapitalCaseFirstWord(positionList[index])}
          </option>
        );
      } else {
        option.push(
          <option value={positionList[index]} key={positionList[index]}>
            {CapitalCaseFirstWord(positionList[index])}
          </option>
        );
      }
    }
    return option;
  };

  return (
    <>
      <Form onSubmit={handleSaveForm}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>NPK</Form.Label>
            <Form.Control
              required
              type="number"
              id="npk"
              placeholder="Enter NPK"
              onChange={OnChangeForm}
              value={npk}
              disabled={onHandleDisabledNpk}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              id="userName"
              placeholder="Enter Name"
              onChange={OnChangeForm}
              value={name}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              id="password"
              placeholder="Enter Password"
              onChange={OnChangeForm}
              value={password}
            />
          </Form.Group>
        </Row>
        <br />
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              id="email"
              placeholder="Enter Email"
              onChange={OnChangeForm}
              value={email}
            />
          </Form.Group>
        </Row>
        <br />
        <Row>
          <Form.Group as={Col} controlId="section">
            <Form.Label>Section</Form.Label>
            <Form.Select defaultValue="" onChange={handleSelectedSection}>
              <option value="">Choose...</option>
              {optionMenuSection()}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="position">
            <Form.Label>Position</Form.Label>
            <Form.Select defaultValue="" onChange={handleSelectedPosition}>
              <option value="">Choose...</option>
              {optionMenuPosition()}
            </Form.Select>
          </Form.Group>
        </Row>
        <br />
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              {dataEdit.npk !== "" ? "Update" : "Save"}
            </Button>{" "}
            {dataEdit.npk !== "" && (
              <Button variant="danger" onClick={handleCancelUpdate}>
                Cancel
              </Button>
            )}
          </Col>
          <Col />
        </Row>
        <Row>
          <Col>
            <br />
            {alert && (
              <Alert variant="danger" key={"danger"}>
                Please Check Your Input!!
              </Alert>
            )}
            {alertBerhasil && (
              <Alert variant="primary" key={"primary"}>
                Data Success
              </Alert>
            )}
          </Col>
        </Row>
      </Form>
      <br />
    </>
  );
}

export default GlobalConsumer(FormRegisterUser);
