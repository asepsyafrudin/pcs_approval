import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { CapitalCaseFirstWord } from "../../../config/capitalCaseWord";
import PaginationTable from "../../atom/paginationTable";
import { VscPreview } from "react-icons/vsc";

function TableTrialDocument(props) {
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);

  const handleOnChangePage = (e) => {
    setPage(e);
  };

  const handleDelete = async (e) => {
    setShowModalConfirm(true);
  };

  let table = [];

  const dataPerPage = 10;
  const maxPagesShow = 3;
  const totalPageData = Math.ceil(dataList.length / dataPerPage);

  if (dataList) {
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
          <tr key={dataList[index].npk} id={dataList[index].id}>
            <td>{index + 1}</td>
            <td>
              {CapitalCaseFirstWord(dataList[index].document_description)}
            </td>
            <td style={{ textAlign: "center" }}>
              <Button
                variant="danger"
                size="sm"
                id={dataList[index].userId}
                onClick={(e) => handleDelete(e)}
                children={<MdDeleteForever style={{ pointerEvents: "none" }} />}
              />
              <Button
                variant="danger"
                size="sm"
                id={dataList[index].userId}
                onClick={(e) => handleDelete(e)}
                children={<VscPreview style={{ pointerEvents: "none" }} />}
              />
            </td>
          </tr>
        );
      }
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
          style={{ textAlign: "center", minWidth: "1100px" }}
        >
          <thead style={{ fontWeight: "bold" }}>
            <tr>
              <td>No</td>
              <td>Document Description</td>
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

export default TableTrialDocument;
