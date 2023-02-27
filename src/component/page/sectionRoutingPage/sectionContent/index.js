import React, { useState } from "react";
import { GlobalConsumer } from "../../../../context/store";
import SectionTitle from "../../../atom/sectionTitle";
import SectionData from "../sectionData";
import SectionMenu from "../sectionMenu";
import "./sectionContent.css";

function SectionContent(props) {
  const { documentTypeSelected, productNameSelected } = props;
  const menuActive = () => {
    if (documentTypeSelected === "") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="section-container">
        <SectionTitle product={productNameSelected} title="Document Menu" />
        <div style={{ display: menuActive() ? "" : "none" }}>
          <SectionMenu productSelected={productNameSelected} />
        </div>
        <div style={{ display: menuActive() ? "none" : "" }}>
          <SectionData
            documentTypeSelected={documentTypeSelected}
            productSelected={productNameSelected}
          />
        </div>
      </div>
    </>
  );
}

export default GlobalConsumer(SectionContent);
