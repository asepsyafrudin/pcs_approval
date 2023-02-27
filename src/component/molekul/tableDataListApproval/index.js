import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { GlobalConsumer } from "../../../context/store";
import PaginationTable from "../../atom/paginationTable";
import { BiDetail } from "react-icons/bi";
import "./tableDataListApproval.css";
import { GrEdit } from "react-icons/gr";

import {
  EDITDOCUMENT,
  OPENPREVIEWDOCUMENT,
  SAVEASDRAFT,
  WAITINGAPPROVAL1,
  WAITINGAPPROVAL2,
} from "../../../context/const";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import axios from "axios";
import { GET_ALL_DOCUMENT_API, GET_USER_API } from "../../../config/api";
import { RiCoinsLine } from "react-icons/ri";

function tableDataListApproval(props) {
  const { dispatch, user, productNameSelected, actionState } = props;
  const [totalList, setTotalList] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(GET_ALL_DOCUMENT_API)
      .then((response) => {
        const list = response.data;
        const data = list.filter(
          (value) => value.section === productNameSelected
        );
        setTotalList(data);
      })
      .catch((error) => console.log(error));

    axios
      .get(GET_USER_API)
      .then((response) => {
        const list = response.data;
        setDataUser(list);
      })
      .catch((error) => console.log(error));
  }, [actionState]);

  const handleOnChangePage = (e) => {
    setPage(e);
  };

  const handlePreview = (e) => {
    const data = totalList.find((value) => value.approvalId === e.target.id);
    dispatch({ type: OPENPREVIEWDOCUMENT, payload: data });
    navigate("/approvalDocument");
  };

  //notification at table list for approval

  //pagination
  let table = [];
  const dataPerPage = 10;
  const maxPagesShow = 3;
  const totalPage = Math.ceil(totalList.length / dataPerPage);

  if (totalList.length === 0) {
    table.push(
      <tr key={new Date()}>
        <td colSpan={13}>
          <h3 style={{ textAlign: "center" }}>Data Kosong</h3>
        </td>
      </tr>
    );
  } else {
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < totalList.length;
      index++
    ) {
      const userCreated = dataUser.find(
        (value) =>
          parseInt(value.userId) === parseInt(totalList[index].createdBy)
      );

      const notificationRemainder = () => {
        let badgeNotif = [];
        if (totalList[index].documentStatus === WAITINGAPPROVAL1) {
          if (parseInt(totalList[index].approval1UserId) === user.userId) {
            badgeNotif.push(
              <Badge pill bg="warning" key={totalList[index].approvalId}>
                Need Your Approval
              </Badge>
            );
          }
        } else if (totalList[index].documentStatus === WAITINGAPPROVAL2) {
          if (parseInt(totalList[index].approval2UserId) === user.userId) {
            badgeNotif.push(
              <Badge pill bg="warning" key={totalList[index].approvalId}>
                Need Your Approval
              </Badge>
            );
          }
        }

        return badgeNotif;
      };

      const handleEdit = (e) => {
        const data = totalList.find(
          (value) => value.approvalId === e.target.id
        );
        dispatch({ type: EDITDOCUMENT, payload: data });
        dispatch({ type: "backProductPage" });
        navigate("/formDocument");
      };
      const buttonEdit = (idButton, idUser) => {
        if (parseInt(idUser) === user.userId) {
          return (
            <>
              <Button
                title={`Edit`}
                variant="primary"
                size="sm"
                id={idButton}
                onClick={(e) => handleEdit(e)}
              >
                <GrEdit style={{ pointerEvents: "none" }} />
              </Button>
            </>
          );
        } else {
          return "";
        }
      };

      table.push(
        <tr key={totalList[index].approvalId} id={totalList[index].approvalId}>
          <td>{index + 1}</td>
          <td>{totalList[index].approvalId}</td>
          <td>{totalList[index].section}</td>
          <td>{totalList[index].typeDocument}</td>
          <td>{totalList[index].processName}</td>
          <td>{totalList[index].documentNumber}</td>
          <td>{totalList[index].representativePartNumber}</td>
          <td>{totalList[index].representativeType}</td>
          <td>{totalList[index].revision}</td>
          <td>{userCreated && userCreated.name}</td>
          <td>{totalList[index].createdDate}</td>
          <td>{totalList[index].documentStatus}</td>
          <td style={{ textAlign: "center" }}>
            <Button
              variant="danger"
              size="sm"
              id={totalList[index].approvalId}
              onClick={handlePreview}
              title="OPEN"
            >
              <BiDetail style={{ pointerEvents: "none" }} />
            </Button>{" "}
            {notificationRemainder()}
            {totalList[index].documentStatus === SAVEASDRAFT &&
              buttonEdit(
                totalList[index].approvalId,
                totalList[index].createdBy
              )}
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
              <td>E-Approval Id</td>
              <td>Section</td>
              <td>Type Document</td>
              <td>Process Name</td>
              <td>Document Number</td>
              <td>Representative Part Number</td>
              <td>Representative Type</td>
              <td>Revision</td>
              <td>Created By</td>
              <td>Created Date</td>
              <td>Document Status</td>
              <td width={120}>Action</td>
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

export default GlobalConsumer(tableDataListApproval);
