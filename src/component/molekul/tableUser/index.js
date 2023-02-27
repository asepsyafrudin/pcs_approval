import React, { useState, useEffect } from "react";
import PaginationTable from "../../atom/paginationTable";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { GlobalConsumer } from "../../../context/store";
import { VscPreview } from "react-icons/vsc";
import ModalConfirmation from "../modalConfirmation";
import ModalUserProfile from "../modalUserProfile";
import { CapitalCaseFirstWord } from "../../../config/capitalCaseWord";
import { DELETEUSER } from "../../../context/const";
import axios from "axios";
import { GET_USER_API } from "../../../config/api";

function TableUser(props) {
  const { editId, actionState } = props;
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [nameToDelete, setNameToDelete] = useState("");
  const [idToDelete, setIdToDelete] = useState("");
  const [userIdToView, setUserIdToView] = useState("");
  const [showModalUser, setShowModalUser] = useState(false);

  useEffect(() => {
    axios.get(GET_USER_API).then((response) => {
      const dataUser = response.data;
      setDataList(dataUser);
    });
  }, [actionState]);

  //function handle
  const handleDelete = async (e) => {
    setIdToDelete(e.target.id);
    const name = await dataList.find(
      (value) => value.userId === parseInt(e.target.id)
    );
    setNameToDelete(name.name);
    setShowModal(true);
  };

  const handleEdit = (e) => {
    editId(e.target.id);
  };
  const handlePreview = (e) => {
    setUserIdToView(e.target.id);
    setShowModalUser(true);
  };
  const handleOnChangePage = (e) => {
    setPage(e);
  };

  let table = [];

  const dataPerPage = 10;
  const maxPagesShow = 3;
  const totalPageData = Math.ceil(dataList.length / dataPerPage);

  if (dataList.length === 0) {
    table.push(
      <tr key={new Date()}>
        <td colSpan={11}>
          <h3 style={{ textAlign: "center" }}>Data Kosong</h3>
        </td>
      </tr>
    );
  } else {
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < dataList.length;
      index++
    ) {
      table.push(
        <tr key={dataList[index].npk} id={dataList[index].userId}>
          <td>{index + 1}</td>
          <td>{dataList[index].npk}</td>
          <td>{CapitalCaseFirstWord(dataList[index].name)}</td>
          <td>{dataList[index].email}</td>
          <td>{CapitalCaseFirstWord(dataList[index].section)}</td>
          <td>{CapitalCaseFirstWord(dataList[index].position)}</td>
          <td style={{ textAlign: "center" }}>
            <Button
              title={`Delete - ${dataList[index].name}`}
              variant="danger"
              size="sm"
              id={dataList[index].userId}
              onClick={(e) => handleDelete(e)}
              children={<MdDeleteForever style={{ pointerEvents: "none" }} />}
            ></Button>{" "}
            <Button
              title={`Edit - ${dataList[index].name}`}
              variant="primary"
              size="sm"
              id={dataList[index].userId}
              onClick={(e) => handleEdit(e)}
            >
              <GrEdit style={{ pointerEvents: "none" }} />
            </Button>{" "}
            <Button
              title={`Preview - ${dataList[index].name}`}
              variant="secondary"
              size="sm"
              id={dataList[index].userId}
              onClick={(e) => handlePreview(e)}
              children={<VscPreview style={{ pointerEvents: "none" }} />}
            ></Button>
          </td>
        </tr>
      );
    }
  }

  return (
    <div className="container-table">
      <div
        className="table"
        style={{ width: "1200px", marginTop: "25px", fontSize: "14px" }}
      >
        <Table
          striped
          bordered
          hover
          size="sm"
          responsive
          style={{ textAlign: "center" }}
        >
          <thead style={{ fontWeight: "bold" }}>
            <tr>
              <td>No</td>
              <td>NPK</td>
              <td>Name</td>
              <td>Email</td>
              <td>Section</td>
              <td>Position</td>
              <td width={150}>Action</td>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </Table>
      </div>
      <div>
        <PaginationTable
          totalPage={totalPageData}
          maxPagesShow={maxPagesShow}
          onChangePage={(e) => handleOnChangePage(e)}
        />
      </div>
      <ModalConfirmation
        onHandleClose={(e) => setShowModal(e)}
        onHandleShow={showModal}
        title="Confirmation"
        body={`Are you sure to delete ${nameToDelete}?`}
        idToDelete={idToDelete}
        command={DELETEUSER}
      />
      <ModalUserProfile
        onHandleShow={showModalUser}
        onHandleClose={(e) => setShowModalUser(e)}
        userIdToView={userIdToView}
      />
    </div>
  );
}

export default GlobalConsumer(TableUser);
