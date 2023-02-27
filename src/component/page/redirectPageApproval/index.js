import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_DOCUMENT_BY_APPROVALID, GET_USER_API } from "../../../config/api";
import { LOGIN, OPENPREVIEWDOCUMENT } from "../../../context/const";
import { GlobalConsumer } from "../../../context/store";

function RedirectPage(props) {
  const { dispatch, statusLogin } = props;
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const userName = urlParams.get("userName");
  const password = urlParams.get("password");
  const approvalId = urlParams.get("approvalId");
  axios.get(GET_USER_API).then((response) => {
    const dataUser = response.data;
    const findUser = dataUser.find(
      (value) => value.npk === parseInt(userName) && value.password === password
    );
    if (findUser) {
      axios.get(GET_DOCUMENT_BY_APPROVALID(approvalId)).then((response) => {
        const documentData = response.data;
        dispatch({ type: OPENPREVIEWDOCUMENT, payload: documentData[0] });
        dispatch({ type: LOGIN, payload: findUser });
      });
    }
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (statusLogin) {
      navigate("/approvalDocument");
    }
  });

  return (
    <div>
      <h3>Redirect Page to plase wait</h3>
    </div>
  );
}

export default GlobalConsumer(RedirectPage);
