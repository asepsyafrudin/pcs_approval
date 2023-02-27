import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "./cardProduct.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { GlobalConsumer } from "../../../context/store";
import { CapitalCaseFirstWord } from "../../../config/capitalCaseWord";

function CardProduct(props) {
  const { dispatch } = props;

  const handleClick = () => {
    const data = props.title;
    dispatch({ type: "reset", payload: data });
  };

  return (
    <>
      <Card className="card-product">
        <Card.Body>
          <Card.Title>{CapitalCaseFirstWord(props.title)}</Card.Title>
          <Card.Img
            src={require("../../../asset/image/" + props.imgUrl + ".jpg")}
            className="img-product"
          />
        </Card.Body>
        <Link to={`/${props.title}`}>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              value={props.noProductList}
              size="sm"
              onClick={handleClick}
            >
              Open Detail
            </Button>
          </div>
        </Link>
      </Card>
    </>
  );
}

export default GlobalConsumer(CardProduct);
