import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { MdDeleteForever } from "react-icons/md";
import { TiDownload } from "react-icons/ti";
import { GrEdit } from "react-icons/gr";
import { GlobalConsumer } from "../../../context/store";
import PaginationTable from "../../atom/paginationTable";
import { VscPreview } from "react-icons/vsc";
import "./tableDataPfmea.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

function tableDataPfmea(props) {
  const { dataFromStore, productNameSelected } = props;
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setDataList(dataFromStore);
  }, [dataFromStore]);

  //function handle
  const handleDelete = (e) => {
    console.log(e.target.id);
  };
  const handleDownload = (e) => {
    console.log(e.target.id);
  };
  const handleEdit = (e) => {
    console.log(e.target.id);
  };
  const handlePreview = (e) => {
    console.log(e.target.id);
  };
  const handleOnChangePage = (e) => {
    setPage(e);
  };

  let table = [];

  const dataPerPage = 10;
  const maxPagesShow = 3;
  const totalPage = Math.ceil(dataList.length / dataPerPage);

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
          <td>{dataList[index].documentNumber}</td>
          <td>{dataList[index].partNumberRepresentative}</td>
          <td>{dataList[index].typeRepresentative}</td>
          <td>{dataList[index].lineName}</td>
          <td>{dataList[index].createdDate}</td>
          <td>{dataList[index].approvalDate}</td>
          <td>{dataList[index].user}</td>
          <td>{dataList[index].rev}</td>
          <td style={{ textAlign: "center" }}>
            <Button
              variant="danger"
              size="sm"
              id={dataList[index].id}
              onClick={(e) => handleDelete(e)}
              children={<MdDeleteForever style={{ pointerEvents: "none" }} />}
            />{" "}
            <Button
              variant="success"
              size="sm"
              id={dataList[index].id}
              onClick={(e) => handleDownload(e)}
              children={<TiDownload style={{ pointerEvents: "none" }} />}
            />{" "}
            <Button
              variant="primary"
              size="sm"
              id={dataList[index].id}
              onClick={(e) => handleEdit(e)}
            >
              <GrEdit style={{ pointerEvents: "none" }} />
            </Button>{" "}
            <Button
              variant="secondary"
              size="sm"
              id={dataList[index].id}
              onClick={(e) => handlePreview(e)}
              children={<VscPreview style={{ pointerEvents: "none" }} />}
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
              <td>Create Date</td>
              <td>Approval Date</td>
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
          totalPage={totalPage}
          maxPagesShow={maxPagesShow}
          onChangePage={(e) => handleOnChangePage(e)}
        />
      </div>
    </div>
  );
}

export default GlobalConsumer(tableDataPfmea);
