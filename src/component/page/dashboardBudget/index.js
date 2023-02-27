import React, { useEffect } from "react";
import { GlobalConsumer } from "../../../context/store";
import "./dashboardBudget.css";

function DashboardBudget(props) {
  const { dispatch } = props;

  useEffect(() => {
    dispatch({
      type: "setTitleHeader",
      payload: "Budget Monitoring System",
    });
  }, []);

  return (
    <div className="container-dashboard-budget">
      <div className="content-dashboard-budget">
        <h2 style={{ backgroundColor: "white" }}>
          Halaman graph dasboard untuk budget
        </h2>
      </div>
    </div>
  );
}

export default GlobalConsumer(DashboardBudget);
