import React, { useState, useEffect } from "react";
import PaginationTable from "../../atom/paginationTable";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { MdDeleteForever } from "react-icons/md";
import { GlobalConsumer } from "../../../context/store";
import { CapitalCaseFirstWord } from "../../../config/capitalCaseWord";
import {
  APPROVAL_1,
  APPROVAL_2,
  DELETEAPPROVALUSER,
} from "../../../context/const";
import ModalConfirmation from "../modalConfirmation";
import axios from "axios";
import { GET_APPROVAL_RULE_API } from "../../../config/api";

function TableApproval(props) {
  const { command, actionState } = props;
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [nameToDelete, setNameToDelete] = useState("");

  useEffect(() => {
    axios(GET_APPROVAL_RULE_API).then((response) => {
      const dataSetApprovalUser = response.data;
      if (dataSetApprovalUser) {
        if (command === APPROVAL_1) {
          const dataList = dataSetApprovalUser.filter(
            (value) => value.status === APPROVAL_1
          );
          setDataList(dataList);
        } else {
          const dataList = dataSetApprovalUser.filter(
            (value) => value.status === APPROVAL_2
          );
          setDataList(dataList);
        }
      }
    });
  }, [actionState]);

  //function handle
  const handleDelete = async (e) => {
    setShowModalConfirm(true);
    setIdToDelete(e.target.id);
    setNameToDelete(e.target.name);
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
        <tr key={dataList[index].id} id={dataList[index].id}>
          <td>{index + 1}</td>
          <td>{CapitalCaseFirstWord(dataList[index].section)}</td>
          <td>{CapitalCaseFirstWord(dataList[index].name)}</td>
          <td style={{ textAlign: "center" }}>
            <Button
              variant="danger"
              size="sm"
              id={dataList[index].id}
              name={dataList[index].name}
              onClick={(e) => handleDelete(e)}
              children={<MdDeleteForever style={{ pointerEvents: "none" }} />}
            />
          </td>
        </tr>
      );
    }
  }

  return (
    <div className="container-table">
      <div
        className="table"
        style={{ maxWidth: "1200px", marginTop: "25px", fontSize: "14px" }}
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
              <td>Section</td>
              <td>Name</td>
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
        onHandleClose={(e) => setShowModalConfirm(e)}
        onHandleShow={showModalConfirm}
        title="Confirmation"
        body={`Are you sure to delete ${nameToDelete}?`}
        idToDelete={idToDelete}
        command={DELETEAPPROVALUSER}
      />
    </div>
  );
}

export default GlobalConsumer(TableApproval);
