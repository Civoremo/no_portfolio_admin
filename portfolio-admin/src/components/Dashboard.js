/** @format */
import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

const Dashboard = () => {
  let historyRedirect = useHistory();
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/users/verify`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      responseType: "json",
    })
      .then(result => {
        if (result.status !== 200) {
          localStorage.clear();
          historyRedirect.push("/login");
        }
      })
      .catch(err => {
        localStorage.clear();
        historyRedirect.push("/login");
      });
  }, []);

  return (
    <div>
      <div>Dashboard component goes here</div>
    </div>
  );
};

export default Dashboard;
