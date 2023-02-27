import React, { useEffect } from "react";
import { ImUserPlus } from "react-icons/im";
import CardAdmin from "../../atom/cardAdmin";
import { MdApproval } from "react-icons/md";
import { GrDocumentPdf } from "react-icons/gr";
import "./homeAdmin.css";
import { GlobalConsumer } from "../../../context/store";

function HomeAdmin(props) {
  const { dispatch } = props;
  useEffect(() => {
    dispatch({ type: "setTitleHeader", payload: "Dashboard Admin" });
  }, []);

  return (
    <div className="homeAdmin-container">
      <CardAdmin
        title="Create User"
        icon={<ImUserPlus />}
        variant="primary"
        navigateTo="/register_admin"
      />
      <CardAdmin
        title="Set Approval"
        icon={<MdApproval />}
        variant="success"
        navigateTo="/set_approval_admin"
      />
      <CardAdmin
        title="Trial DOC"
        icon={<GrDocumentPdf />}
        variant="warning"
        navigateTo="/trial_document_pdfTron"
      />
    </div>
  );
}

export default GlobalConsumer(HomeAdmin);
