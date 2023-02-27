import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ModalTrialDocument from "../../molekul/modalTrialDocument";

function TrialDocument(props) {
  const [showModalRegister, setShowModalRegister] = useState(false);

  const handleRegister = () => {
    setShowModalRegister(true);
  };

  const handleCloseModalRegister = (e) => {
    setShowModalRegister(false);
  };

  return (
    <div>
      <div className="trial-document-container">
        <div>
          <Button variant="primary" type="button" onClick={handleRegister}>
            Create an Approval
          </Button>
        </div>
        <div>disini datanya</div>
      </div>
      <ModalTrialDocument
        onHandleShow={showModalRegister}
        onHandleClose={handleCloseModalRegister}
      />
    </div>
  );
}

export default TrialDocument;
