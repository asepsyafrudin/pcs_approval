import React, { useState, useEffect } from "react";
import { GlobalConsumer } from "../../../context/store";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LOGIN } from "../../../context/const";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login(props) {
  const [validated, setValidated] = useState(false);
  const { dispatch, user, statusLogin, dataUser } = props;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [alertWrong, setAlertWrong] = useState([]);

  let handleSubmitLogin = (e) => {
    e.preventDefault();

    const checkUser = dataUser.find(
      (value) => value.npk === parseInt(userName) && value.password === password
    );
    if (checkUser) {
      dispatch({ type: LOGIN, payload: checkUser });
    } else {
      setAlertWrong([
        <Alert variant="danger" key="danger">
          Check username and password!!!
        </Alert>,
      ]);
    }
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (statusLogin) {
      navigate("/dashboard");
    }
  });

  useEffect(() => {
    dispatch({
      type: "setTitleHeader",
      payload: "Production Engineering Digitalization",
    });
  }, []);

  return (
    <div className="login-form-container">
      <div className="login">
        <div className="login-title">Login</div>
        <hr />
        {alertWrong}
        <Form noValidate validated={validated} onSubmit={handleSubmitLogin}>
          <Form.Group controlId="inputNPK">
            <Form.Label>Input NPK</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter NPK"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="inputPassword">
            <Form.Label>Input Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default GlobalConsumer(Login);
