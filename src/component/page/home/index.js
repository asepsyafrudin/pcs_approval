import React from "react";
import { GlobalConsumer } from "../../../context/store";
import CardProduct from "../../atom/cardProduct";
import "./home.css";
import { productList } from "../../../context/store/data";
import { useEffect } from "react";

function Home(props) {
  const { dispatch } = props;

  useEffect(() => {
    dispatch({
      type: "setTitleHeader",
      payload: "E-Approval Document & Centralization",
    });
  }, []);

  return (
    <div className="home">
      <div className="home-container">
        {productList.map((value, index) => {
          return (
            <CardProduct
              key={index}
              noProductList={value.No}
              title={value.product}
              description={value.description}
              imgUrl={value.imgUrl}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GlobalConsumer(Home);
