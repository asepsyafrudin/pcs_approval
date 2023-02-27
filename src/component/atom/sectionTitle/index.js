import React, { Fragment, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { GrDocumentStore } from "react-icons/gr";
import { GlobalConsumer } from "../../../context/store";
import "./sectionTitle.css";
import { ImBackward } from "react-icons/im";
import { IoIosCreate } from "react-icons/io";
import { Link } from "react-router-dom";

function SectionTitle(props) {
  const { documentTypeSelected, dispatch, product, title, editDocumentMode } =
    props;

  const menuActive = () => {
    if (documentTypeSelected === "") {
      return false;
    } else {
      return true;
    }
  };

  const handleBackClick = () => {
    dispatch({ type: "backProductPage" });
  };

  const handleClickCreate = () => {
    dispatch({ type: "backProductPage" });
  };

  const backComponent = () => {
    let component = [];
    if (menuActive()) {
      component.push(
        <Fragment key={"backComponent"}>
          <Button variant="primary" onClick={() => handleBackClick()}>
            <ImBackward /> Back
          </Button>
        </Fragment>
      );
    }
    return component;
  };

  const createComponent = () => {
    let component = [];
    if (menuActive()) {
      component.push(
        <Fragment key={"createComponent"}>
          <Link to="/formdocument">
            <Button
              variant="primary"
              onClick={handleClickCreate}
              key="buttonCreate"
            >
              <IoIosCreate /> Create
            </Button>
          </Link>
        </Fragment>
      );
    }
    return component;
  };
  return (
    <div className="section-title">
      <div className="section-title-left">
        {backComponent()}
        <GrDocumentStore /> {"  "}
        <Badge bg="secondary">
          {title} {product} {documentTypeSelected.toUpperCase()}
        </Badge>
      </div>
      <div className="section-title-right">{createComponent()}</div>
    </div>
  );
}

export default GlobalConsumer(SectionTitle);
