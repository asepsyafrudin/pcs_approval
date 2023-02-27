import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { MdDeleteForever } from "react-icons/md";
import { TiDownload } from "react-icons/ti";
import { GrEdit } from "react-icons/gr";
import { GlobalConsumer } from "../../../context/store";
import PaginationTable from "../../atom/paginationTable";
import { VscPreview } from "react-icons/vsc";
import "./tableDataPcs.css";
import axios from "axios";
import {
  GET_DOCUMENT_BY_DOCUMENT_TYPE_AND_SECTION,
  GET_USER_API,
} from "../../../config/api";
import { DOCUMENTCOMPLETE, OPENPREVIEWDOCUMENT } from "../../../context/const";
import { useNavigate } from "react-router-dom";

function tableDataPCS(props) {
  const { productNameSelected, documentTypeSelected, actionState, dispatch } =
    props;
  const [dataList, setDataList] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const data = {
      section: productNameSelected,
      typeDocument: documentTypeSelected,
    };

    axios
      .post(GET_DOCUMENT_BY_DOCUMENT_TYPE_AND_SECTION, data)
      .then((response) => {
        const dataList = response.data;
        const filterDataListAsComplete = dataList.filter(
          (value) => value.documentStatus === DOCUMENTCOMPLETE
        );
        setDataList(filterDataListAsComplete);
      })
      .catch((error) => console.log(error));

    axios
      .get(GET_USER_API)
      .then((response) => {
        const dataUser = response.data;
        setDataUser(dataUser);
      })
      .catch((error) => console.log(error));
  }, [actionState]);

  const navigate = useNavigate();

  const handlePreview = (e) => {
    const data = dataList.find((value) => value.approvalId === e.target.id);
    dispatch({ type: OPENPREVIEWDOCUMENT, payload: data });
    navigate("/approvalDocument");
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
      const userCreated = dataUser.find(
        (value) => value.userId === parseInt(dataList[index].createdBy)
      );
      table.push(
        <tr key={dataList[index].id} id={dataList[index].id}>
          <td>{index + 1}</td>
          <td>{dataList[index].documentNumber}</td>
          <td>{dataList[index].representativePartNumber}</td>
          <td>{dataList[index].representativeType}</td>
          <td>{dataList[index].section}</td>
          <td>{dataList[index].processName}</td>
          <td>{dataList[index].createdDate}</td>
          <td>{userCreated.name}</td>
          <td>{dataList[index].revision}</td>
          <td style={{ textAlign: "center" }}>
            <a href={dataList[index].file}>
              <Button
                variant="success"
                size="sm"
                id={dataList[index].approvalId}
                children={<TiDownload style={{ pointerEvents: "none" }} />}
                title="Download File"
              />{" "}
            </a>

            <Button
              variant="secondary"
              size="sm"
              id={dataList[index].approvalId}
              onClick={(e) => handlePreview(e)}
              children={<VscPreview style={{ pointerEvents: "none" }} />}
              title="VIEW"
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
        style={{ width: "1100px", marginTop: "25px", fontSize: "12px" }}
      >
        <Table striped bordered hover size="sm" style={{ textAlign: "center" }}>
          <thead style={{ fontWeight: "bold" }}>
            <tr>
              <td>No</td>
              <td>Document Number</td>
              <td>Representative Part Number</td>
              <td>Representative Type</td>
              <td>Line Name</td>
              <td>Process Name</td>
              <td>Create Date</td>
              <td>Created By</td>
              <td>Rev</td>
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
    </div>
  );
}

export default GlobalConsumer(tableDataPCS);
