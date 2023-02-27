import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row, Table } from "react-bootstrap";
import { GET_USER_API } from "../../../config/api";
import { CapitalCaseFirstWord } from "../../../config/capitalCaseWord";
import { GlobalConsumer } from "../../../context/store";

function ModalUserProfile(props) {
  const { userIdToView, onHandleShow, onHandleClose, actionState } = props;
  const [user, setUser] = useState("");

  useEffect(() => {
    if (userIdToView) {
      axios.get(GET_USER_API).then((response) => {
        const dataUser = response.data;
        let user = dataUser.find(
          (value) => value.userId === parseInt(userIdToView)
        );
        setUser(user);
      });
    }
  }, [userIdToView, actionState]);

  const handleClose = () => {
    onHandleClose(false);
    setUser("");
  };

  if (user.photo) {
  }

  const imagePreviewShow = () => {
    let photo = [];
    if (user !== "") {
      if (user.photo) {
        photo.push(
          <img
            src={user.photo}
            alt="foto profile"
            style={{ maxHeight: 250, maxWidth: 150 }}
            key={user.userId}
          />
        );
      } else {
        photo.push(
          <img
            key="1"
            src={require("../../../asset/image/profile.jpg")}
            alt="foto profile user"
            style={{ maxHeight: 200, maxWidth: 150 }}
          />
        );
      }
    }
    return photo;
  };

  const userBio = () => {
    let newList = [];
    if (user !== "") {
      newList.push(
        <>
          <tr>
            <td style={{ width: "200px" }}>
              <label>Name</label>
            </td>
            <td>:</td>
            <td>{CapitalCaseFirstWord(user.name)}</td>
          </tr>
          <tr>
            <td>
              <label>NPK</label>
            </td>
            <td>:</td>
            <td>{user.npk}</td>
          </tr>
          <tr>
            <td>
              <label>Email</label>
            </td>
            <td>:</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>
              <label>Password</label>
            </td>
            <td>:</td>
            <td>{user.password}</td>
          </tr>
          <tr>
            <td>
              <label>Section</label>
            </td>
            <td>:</td>
            <td>{CapitalCaseFirstWord(user.section)}</td>
          </tr>
          <tr>
            <td>
              <label>Position</label>
            </td>
            <td>:</td>
            <td>{CapitalCaseFirstWord(user.position)}</td>
          </tr>
        </>
      );
    }
    return newList;
  };
  return (
    <>
      <Modal show={onHandleShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col style={{ textAlign: "center" }}>{imagePreviewShow()}</Col>
              <Col>
                <table>
                  <tbody>{userBio()}</tbody>
                </table>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GlobalConsumer(ModalUserProfile);
