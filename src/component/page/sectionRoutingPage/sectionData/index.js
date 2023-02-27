import React, { useState } from "react";
import "./sectionData.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { MdScreenSearchDesktop } from "react-icons/md";
import TableDataPCS from "../../../molekul/tableDataPCS";
import TableDataQanet from "../../../molekul/tableDataQanet";
import TableDataPfmea from "../../../molekul/tableDataPfmea";
import TableDataListApproval from "../../../molekul/tableDataListApproval";
import SearchDocumentForm from "../../../atom/searchDocumentForm";

function SectionData(props) {
  const { documentTypeSelected } = props;
  const [searchByDocumentNumber, setSearchByDocumentNumber] = useState("");
  const [searchByProcessName, setSearchByProcessName] = useState("");
  const table = () => {
    switch (documentTypeSelected) {
      case "pcs":
        return <TableDataPCS />;

      case "qa net":
        return <TableDataQanet />;

      case "pfmea":
        return <TableDataPfmea />;

      case "approval document":
        return <TableDataListApproval />;

      default:
        return console.log();
    }
  };
  return (
    <div className="section-data">
      <div className="table-content">{table()}</div>
    </div>
  );
}
export default SectionData;
