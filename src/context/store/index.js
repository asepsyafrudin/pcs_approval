import axios from "axios";
import React, { Component, createContext } from "react";
import { RiCoinsLine } from "react-icons/ri";
import {
  APPROVE_1_DOCUMENT_API,
  APPROVE_2_DOCUMENT_API,
  DELETE_APPROVAL_RULE_API,
  DELETE_USER_API,
  GET_ALL_DOCUMENT_API,
  GET_APPROVAL_RULE_API,
  GET_USER_API,
  REGISTER_DOCUMENT_API,
  SAVE_USER_API,
  SET_APPROVAL_RULE_API,
  UPDATE_USER_API,
} from "../../config/api";
import {
  DELETEAPPROVALUSER,
  DELETEUSER,
  DOCUMENTAPPROVE_1,
  DOCUMENTAPPROVE_2,
  DOCUMENTCOMPLETE,
  EDITDOCUMENT,
  EXITEDITDOCUMENT,
  LOGIN,
  OPENPREVIEWDOCUMENT,
  REGISTERAPPROVAL,
  REGISTERDOCUMENT,
  SAVEUSERS,
  SEND_EMAIL_NOTIFICATION,
  SETPRODUCTANDDOCUMENTSELECTED,
  UPDATEUSER,
} from "../const";

const Context = createContext();
const Provider = Context.Provider;

export const GlobalProvider = (Children) => {
  return class ParentComp extends Component {
    state = {
      dataUser: [], //total data user
      statusLogin: false,
      adminRoles: false,
      user: "", // user yang login
      currentUserLogin: "",
      documentTypeSelected: "",
      productNameSelected: "",
      dataFromStore: [],
      dataListPcs: [],
      dataListQaNet: [],
      dataListPfmea: [],
      totalListApproval: [],
      actionState: 0,
      dataSetApprovalUser: [],
      titleHeader: "",
      dataForApprovalDocument: [],
      editDocumentMode: false,
    };

    //Action for req to backend
    dispatch = (action) => {
      //action for login
      if (action.type === LOGIN) {
        const userLogin = action.payload;

        this.setState({ statusLogin: true });
        this.setState({ currentUserLogin: userLogin.name });
        this.setState({ user: userLogin });
        if (userLogin.position === "admin") {
          this.setState({ adminRoles: true });
        }
      }

      //action for product and document selected at section content
      if (action.type === SETPRODUCTANDDOCUMENTSELECTED) {
        this.setState({
          documentTypeSelected: action.payload.documentTypeSelected,
          productNameSelected: action.payload.productSelected,
        });
      }

      //action for reset document selected
      if (action.type === "reset") {
        this.setState({
          documentTypeSelected: "",
          productNameSelected: action.payload,
        });
      }

      //action for backpage on product page
      if (action.type === "backProductPage") {
        this.setState({ documentTypeSelected: "" });
      }

      //action for save users
      if (action.type === SAVEUSERS) {
        const dataSave = action.payload;
        axios
          .post(SAVE_USER_API, dataSave)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            this.setState({ actionState: this.state.actionState + 1 });
          });
      }

      //action for delete user
      if (action.type === DELETEUSER) {
        const id = action.payload;
        axios
          .delete(DELETE_USER_API(id))
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            this.setState({ actionState: this.state.actionState + 1 });
          });
      }

      //update data user
      if (action.type === UPDATEUSER) {
        const dataSave = action.payload;
        axios
          .put(UPDATE_USER_API, dataSave)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error))
          .then(() =>
            this.setState({ actionState: this.state.actionState + 1 })
          );
      }

      //setApproval Rule
      if (action.type === REGISTERAPPROVAL) {
        const dataSave = action.payload;
        axios
          .post(SET_APPROVAL_RULE_API, dataSave)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error))
          .then(() =>
            this.setState({ actionState: this.state.actionState + 1 })
          );
      }

      //Delete Approval Rule
      if (action.type === DELETEAPPROVALUSER) {
        const id = action.payload;
        axios
          .delete(DELETE_APPROVAL_RULE_API(id))
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error))
          .then(() =>
            this.setState({ actionState: this.state.actionState + 1 })
          );
      }

      //register document for approval
      if (action.type === REGISTERDOCUMENT) {
        const data = action.payload;
        const approvalId = data.get("approvalId");
        const approvalUserId = data.get("approval1UserId");
        const emailData = { approvalId, approvalUserId };

        axios
          .post(REGISTER_DOCUMENT_API, data)
          .then((response) => {
            console.log(response);
            axios
              .post(SEND_EMAIL_NOTIFICATION, emailData)
              .then((response) => console.log(response))
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error))
          .then(() =>
            this.setState({ actionState: this.state.actionState + 1 })
          );
      }

      //setHeaderTitle of Page
      if (action.type === "setTitleHeader") {
        const data = action.payload;
        this.setState({ titleHeader: data });
      }

      //set state to open approval document page
      if (action.type === OPENPREVIEWDOCUMENT) {
        const data = action.payload;
        this.setState({ dataForApprovalDocument: data });
      }

      //approve document api
      if (action.type === DOCUMENTAPPROVE_1) {
        const data = action.payload.data;
        const id = action.payload.id;
        const emailData = {
          approvalId: data.approvalId,
          approvalUserId: data.approval2UserId,
        };
        axios
          .put(APPROVE_1_DOCUMENT_API(id), data)
          .then((response) => {
            console.log(response);
            axios
              .post(SEND_EMAIL_NOTIFICATION, emailData)
              .then((response) => console.log(response))
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error))
          .then(() =>
            this.setState({ actionState: this.state.actionState + 1 })
          );
      }

      if (action.type === DOCUMENTAPPROVE_2) {
        const data = action.payload.data;
        const id = action.payload.id;
        const emailData = {
          approvalId: data.approvalId,
          approvalUserId: data.createdBy,
        };
        axios
          .put(APPROVE_2_DOCUMENT_API(id), emailData)
          .then((response) => {
            console.log(response);
            axios
              .post(SEND_EMAIL_NOTIFICATION, emailData)
              .then((response) => console.log(response))
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      }

      if (action.type === EDITDOCUMENT) {
        const data = action.payload;
        this.setState({ editDocumentMode: true });
        this.setState({ dataForApprovalDocument: data });
      }

      if (action.type === EXITEDITDOCUMENT) {
        this.setState({ dataForApprovalDocument: [] });
      }
    };

    componentDidMount() {
      axios
        .get(GET_USER_API)
        .then((response) => {
          this.setState({ dataUser: response.data });
        })
        .catch((error) => console.log(error));

      axios
        .get(GET_APPROVAL_RULE_API)
        .then((response) => {
          this.setState({ dataSetApprovalUser: response.data });
        })
        .catch((error) => console.log(error));

      axios
        .get(GET_ALL_DOCUMENT_API)
        .then((response) => {
          const filterData = response.data.filter(
            (value) => value.documentStatus !== DOCUMENTCOMPLETE
          );
          this.setState({ totalListApproval: filterData });
        })
        .catch((error) => console.log(error));
    }

    componentDidUpdate(prevProps, preveState) {
      //filter datapcs after productName di pilih di halaman sectionContent
      if (preveState.documentTypeSelected !== this.state.documentTypeSelected) {
        const dataTable = this.state.totalListApproval.filter(
          (value) =>
            value.documentType === this.state.documentTypeSelected &&
            value.product === this.state.productNameSelected
        );
        this.setState({ dataFromStore: dataTable });
      }

      if (preveState.action !== this.state.action) {
        fetch(GET_USER_API)
          .then((response) => response.json())
          .then((data) => {
            this.setState({ dataUser: data });
          })
          .catch((error) => {
            console.log("Error :", error);
          });

        axios
          .get(GET_APPROVAL_RULE_API)
          .then((response) => {
            this.setState({ dataSetApprovalUser: response.data });
          })
          .catch((error) => console.log(error));

        axios
          .get(GET_ALL_DOCUMENT_API)
          .then((response) => {
            const filterData = response.data.filter(
              (value) => value.documentStatus !== DOCUMENTCOMPLETE
            );
            this.setState({ totalListApproval: filterData });
          })
          .catch((error) => console.log(error));
      }
    }

    render() {
      return (
        <Provider
          value={{
            statusLogin: this.state.statusLogin,
            user: this.state.user,
            currentUserLogin: this.state.currentUserLogin,
            dispatch: this.dispatch,
            documentTypeSelected: this.state.documentTypeSelected,
            productNameSelected: this.state.productNameSelected,
            dataFromStore: this.state.dataFromStore,
            dataListPcs: this.state.dataListPcs,
            dataListPfmea: this.state.dataListPfmea,
            dataListQaNet: this.state.dataListQaNet,
            totalListApproval: this.state.totalListApproval,
            adminRoles: this.state.adminRoles,
            dataUser: this.state.dataUser,
            dataSetApprovalUser: this.state.dataSetApprovalUser,
            titleHeader: this.state.titleHeader,
            dataForApprovalDocument: this.state.dataForApprovalDocument,
            editDocumentMode: this.state.editDocumentMode,
            actionState: this.state.actionState,
          }}
        >
          <Children {...this.props} />
        </Provider>
      );
    }
  };
};

const Consumer = Context.Consumer;
export const GlobalConsumer = (Children) => {
  return class ParentComp extends Component {
    render() {
      return (
        <Consumer>
          {(value) => {
            return <Children {...this.props} {...value} />;
          }}
        </Consumer>
      );
    }
  };
};
