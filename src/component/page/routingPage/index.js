import React from "react";
import { Route, Routes } from "react-router-dom";
import { GlobalConsumer } from "../../../context/store";
import Home from "../home";
import Login from "../login";
import ProtectedRoute from "../../authenticated/protectedRoute";
import SectionContent from "../sectionRoutingPage/sectionContent";
import FormDocument from "../formDocument";
import Admin from "../adminRegisterUser";
import ProtectedAdmin from "../../authenticated/protectedAdmin";
import PageNotFound from "../pageNotFound";
import HomeAdmin from "../homeAdmin";
import SetApproval from "../setApprovalUser";
import TrialDocument from "../trialDocument";
import Dashboard from "../dashboard";
import PDFViewer from "../pdfViewer";
import ApprovalDocument from "../approvalDocument";
import RedirectPage from "../redirectPageApproval";
import DashboardBudget from "../dashboardBudget";

function RoutingPage(props) {
  const { statusLogin, adminRoles } = props;

  return (
    <div>
      <Routes>
        {/* public page */}
        <Route index element={<Login />} />
        <Route path="/redirectPage/:id" element={<RedirectPage />} />
        {/* protected page */}
        <Route element={<ProtectedRoute statusLogin={statusLogin} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/formdocument" element={<FormDocument />} />
          <Route path="/:sectionId" element={<SectionContent />} />
          <Route path="/approvalDocument" element={<ApprovalDocument />} />
          <Route path="/pagenotfound" element={<PageNotFound />} />
          <Route path="/dashboard-budget" element={<DashboardBudget />} />
          <Route element={<ProtectedAdmin adminRoles={adminRoles} />}>
            <Route path="/register_admin" element={<Admin />} />
            <Route path="/home_admin" element={<HomeAdmin />} />
            <Route path="/set_approval_admin" element={<SetApproval />} />
            <Route path="/trial_document" element={<TrialDocument />} />
            <Route path="/trial_document_pdfTron" element={<PDFViewer />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default GlobalConsumer(RoutingPage);
