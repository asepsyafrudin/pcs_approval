const portLocalHost = "http://localhost:8080";

export const SAVE_USER_API = portLocalHost + "/api/users/registerUser";

export const DELETE_USER_API = (id) => {
  let address = portLocalHost + "/api/users/deleteUser" + `/${id}`;
  return address;
};

export const UPDATE_USER_API = portLocalHost + "/api/users/updateUser";
export const GET_USER_API = portLocalHost + "/api/users/getUser";
export const SET_APPROVAL_RULE_API = portLocalHost + "/api/approval/register";
export const GET_APPROVAL_RULE_API =
  portLocalHost + "/api/approval/getAllApproval";
export const DELETE_APPROVAL_RULE_API = (id) => {
  let address = portLocalHost + "/api/approval/delete" + `/${id}`;
  return address;
};

export const REGISTER_DOCUMENT_API =
  portLocalHost + "/api/documentApproval/registerDocumentApproval";
export const GET_ALL_DOCUMENT_API =
  portLocalHost + "/api/documentApproval/getAllDocumentApproval";

export const APPROVE_1_DOCUMENT_API = (id) => {
  let address = portLocalHost + `/api/documentApproval/approve1Document/${id}`;
  return address;
};

export const APPROVE_2_DOCUMENT_API = (id) => {
  let address = portLocalHost + `/api/documentApproval/approve2Document/${id}`;
  return address;
};

export const GET_DOCUMENT_BY_DOCUMENT_TYPE_AND_SECTION =
  portLocalHost + "/api/documentApproval/getDocumentByTypeDocumentAndSection";

export const GET_DOCUMENT_BY_APPROVALID = (id) => {
  return portLocalHost + `/api/documentApproval/getDocumentByApprovalId/${id}`;
};
