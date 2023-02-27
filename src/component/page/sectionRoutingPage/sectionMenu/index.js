import React from "react";
import CardDocument from "../../../atom/cardDocument";
import { documentMenu } from "../../../../context/store/data";
import "./sectionMenu.css";

function SectionMenu(props) {
  const { productSelected } = props;

  return (
    <div className="section-content-container">
      <div className="section-content">
        {documentMenu.map((el, index) => {
          return (
            <CardDocument
              keyword={el.keyword}
              key={index}
              title={el.type}
              description={el.decription}
              productSelected={productSelected}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SectionMenu;
