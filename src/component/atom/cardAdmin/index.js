import React, { useState } from "react";
import "./cardAdmin.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { GlobalConsumer } from "../../../context/store";

function CardAdmin(props) {
  const { title, icon, variant, navigateTo } = props;

  const navigate = useNavigate();
  return (
    <div className="card-container-admin">
      <div className="card-admin-title">{title}</div>
      <Button variant={variant} onClick={() => navigate(navigateTo)}>
        <div style={{ fontSize: "100px" }}>{icon}</div>
      </Button>
    </div>
  );
}

export default GlobalConsumer(CardAdmin);
