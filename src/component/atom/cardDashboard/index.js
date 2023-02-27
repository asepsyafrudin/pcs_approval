import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./cardDashboard.css";

function CardDashboard(props) {
  const { title, img, bodyDescription, pDescription, link } = props;
  return (
    <>
      <div className="card-dashboard">
        <div className="card-dashboard-header">
          <img src={require("../../../asset/image/" + img)} alt="rover" />
        </div>
        <div className="card-body-dashboard">
          <Link
            to={link ? link : "/dashboard"}
            style={{ textDecoration: "none" }}
          >
            <div className="tag tag-teal">{title}</div>
          </Link>
          <h4>{bodyDescription}</h4>
          <p>{pDescription}</p>
        </div>
      </div>
    </>
  );
}

export default CardDashboard;
