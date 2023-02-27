import React from "react";
import { Card } from "react-bootstrap";
import { FcProcess } from "react-icons/fc";
import { GlobalConsumer } from "../../../context/store";
import Button from "react-bootstrap/Button";
import "./cardDocument.css";
import { SETPRODUCTANDDOCUMENTSELECTED } from "../../../context/const";

function CardDocument(props) {
  const { title, description, keyword, productSelected, dispatch } = props;

  const handleOnClick = () => {
    const data = {
      documentTypeSelected: title,
      productSelected: productSelected,
    };
    dispatch({ type: SETPRODUCTANDDOCUMENTSELECTED, payload: data });
  };
  return (
    <>
      <Card className="card-document">
        <Card.Body>
          <div className="symbol-card-document">
            <FcProcess size={50} />
          </div>
          <Card.Title style={{ fontWeight: "bold" }}>
            {title.toUpperCase()}
          </Card.Title>
          <Card.Text>
            <span className="card-keyword">{keyword} </span>
            {description}
          </Card.Text>
        </Card.Body>
        <div className="d-grid gap-2">
          <Button variant="primary" size="sm" onClick={handleOnClick}>
            Open Detail
          </Button>
        </div>
      </Card>
    </>
  );
}

export default GlobalConsumer(CardDocument);
