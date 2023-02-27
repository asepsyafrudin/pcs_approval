import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./setApproval.css";
import { HiUserAdd } from "react-icons/hi";
import ModalFormSetApproval from "../../molekul/modalFormSetApproval";
import TableApproval from "../../molekul/tableApproval";
import { APPROVAL_1, APPROVAL_2 } from "../../../context/const";

function SetApproval() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [command, setCommand] = useState("");

  const handleAddApproval = (e) => {
    if (e.target.id === "1") {
      setShow(true);
      setTitle("Setup First Approval");
      setCommand(APPROVAL_1);
    } else {
      setShow(true);
      setTitle("Setup Second Approval");
      setCommand(APPROVAL_2);
    }
  };
  return (
    <div className="set-approval-admin">
      <div className="title-set-approval">First Approval List</div>
      <div className="table-approval-container">
        <div className="button-add-approval">
          <Button
            variant="primary"
            id="1"
            size="sm"
            style={{ width: 80 }}
            onClick={handleAddApproval}
          >
            <span style={{ fontSize: 18, marginRight: 5 }}>
              <HiUserAdd />
            </span>
            Add
          </Button>
        </div>
        <div className="table-form-approval">
          <TableApproval command={APPROVAL_1} />
        </div>
      </div>
      <br />
      <div className="title-set-approval">Second Approval List</div>
      <div className="form-approval">Filter</div>
      <div className="table-form-approval">
        <div className="button-add-approval">
          <Button
            variant="primary"
            size="sm"
            id="2"
            onClick={handleAddApproval}
            style={{ width: 80 }}
          >
            <span style={{ fontSize: 18, marginRight: 5 }}>
              <HiUserAdd />
            </span>
            Add
          </Button>
        </div>
        <div className="table-form-approval">
          <TableApproval command={APPROVAL_2} />
        </div>
      </div>
      <ModalFormSetApproval
        onHandleShow={show}
        onHandleClose={(e) => setShow(e)}
        title={title}
        command={command}
      />
    </div>
  );
}

export default SetApproval;
