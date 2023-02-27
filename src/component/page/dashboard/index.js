import React from "react";
import "./dashboard.css";
import { dashboardList } from "../../../context/store/data";
import CardDashboard from "../../atom/cardDashboard";
import { GlobalConsumer } from "../../../context/store";
import { useEffect } from "react";

function Dashboard(props) {
  const { dispatch } = props;
  useEffect(() => {
    dispatch({
      type: "setTitleHeader",
      payload: "Production Engineering Dashboard",
    });
  }, []);

  return (
    <div className="dashboard-body">
      <div className="dashboard-container">
        {dashboardList.map((value, index) => {
          return (
            <CardDashboard
              key={index}
              img={value.img}
              link={value.link}
              title={value.title}
              bodyDescription={value.bodyDescription}
              pDescription={value.pDescription}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GlobalConsumer(Dashboard);
