import React, { useEffect, useState } from "react";
import "./admin.css";
import { SiInformatica } from "react-icons/si";
import FormRegisterUser from "../../molekul/formRegisterUser";
import { Button } from "react-bootstrap";
import { GlobalConsumer } from "../../../context/store";
import TableUser from "../../molekul/tableUser";
import axios from "axios";
import { GET_USER_API } from "../../../config/api";

const modelDataEdit = {
  name: "",
  npk: "",
  password: "",
  section: "",
  email: "",
  position: "",
};
function Admin(props) {
  const { actionState } = props;
  const [dataUser, setDataUser] = useState("");
  const [foto, setFoto] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [temporaryImage, setTemporaryImage] = useState("");
  const [disableButtonSet, setDisableButtonSet] = useState(false);
  const [dataEdit, setDataEdit] = useState(modelDataEdit);
  const [disabledNpk, setDisabledNpk] = useState(false);
  const handleChangeSetImagePreview = (e) => {
    const file = e.target.files[0];
    setTemporaryImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleClickSetFoto = () => {
    setFoto(temporaryImage);
    setDisableButtonSet(true);
  };

  const imagePreviewShow = () => {
    if (imagePreview === "") {
      return (
        <img
          src={require("../../../asset/image/profile.jpg")}
          alt="foto profile"
          style={{ maxHeight: 350, maxWidth: 250 }}
        />
      );
    } else {
      return (
        <img
          src={imagePreview}
          alt="foto profile"
          style={{ maxHeight: 350, maxWidth: 250 }}
        />
      );
    }
  };

  //reset image preview from child component
  const onHandleReset = (e) => {
    setImagePreview(e);
    setFoto(e);
    setDisableButtonSet(false);
  };

  useEffect(() => {
    axios
      .get(GET_USER_API)
      .then((response) => {
        const dataUser = response.data;
        setDataUser(dataUser);
      })
      .catch((error) => console.log(error));
  }, [actionState]);

  const handleEdit = (id) => {
    const dataEdit = dataUser.find((value) => value.userId === parseInt(id));
    setDataEdit(dataEdit);
    setImagePreview(dataEdit.photo);
    setFoto(dataEdit.photo);
    setDisabledNpk(true);
  };

  const handleCancelEdit = () => {
    setDataEdit(modelDataEdit);
    setImagePreview("");
  };

  return (
    <div className="admin-container">
      <div className="admin-title">
        <SiInformatica style={{ marginRight: "5px" }} />
        Register User
      </div>
      <div className="admin-content">
        <div className="admin-fotoProfile">
          <div className="foto">{imagePreviewShow()}</div>
          <br />
          <input
            type="file"
            className="custom-file-input"
            onChange={handleChangeSetImagePreview}
            disabled={disableButtonSet}
          />
          <Button
            variant="primary"
            disabled={disableButtonSet}
            onClick={handleClickSetFoto}
          >
            Set Foto
          </Button>
        </div>
        <div className="admin-form-registerUser">
          <FormRegisterUser
            fotoProfile={foto}
            handleResetFotoProfile={(e) => onHandleReset(e)}
            dataEdit={dataEdit}
            onHandleCancelEdit={handleCancelEdit}
            onHandleDisabledNpk={disabledNpk}
            onHandleCancelDisabledNpk={() => setDisabledNpk(false)}
          />
        </div>
      </div>
      <div className="admin-list-body">
        <div className="admin-title">
          <SiInformatica style={{ marginRight: "5px" }} />
          Data User
        </div>
        <div className="admin-table-user">
          <TableUser editId={handleEdit} />
        </div>
      </div>
    </div>
  );
}

export default GlobalConsumer(Admin);
