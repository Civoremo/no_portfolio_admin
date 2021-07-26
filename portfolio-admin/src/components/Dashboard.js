/** @format */
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { Link, Route } from "react-router-dom";

import "../css/Dashboard.css";
import About from "./About";
import EditAbout from "./EditAbout";

const Dashboard = () => {
  let historyRedirect = useHistory();
  let sectionId = useRef(null);

  // used to verify an authorized admin is viewing page
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
        console.log("verify", result);
        if (result.status !== 200) {
          localStorage.clear();
          historyRedirect.push("/login");
        }
      })
      .catch(err => {
        localStorage.clear();
        historyRedirect.push("/login");
      });
  }, [historyRedirect]);

  return (
    <div className='dashboard-container'>
      <div className='dashboard-header'>Portfolio CMS</div>
      <div className='dashboard-main-content'>
        <div className='dashboard-link-section'>
          <Link className='nav-link' to='/dashboard'>
            Home
          </Link>
          <Link className='nav-link' to='/dashboard/about'>
            About Content
          </Link>
          <Link className='nav-link' to='/dashboard/projects'>
            Projects
          </Link>
          <Link className='nav-link' to='/dashboard/contact'>
            Contact Content
          </Link>
          <Link className='nav-link' to='/login'>
            Log Out
          </Link>
        </div>
        <div className='dashboard-components'>
          {/* Components will render here to manage portfolio content. */}
          <Route
            exact={true}
            path='/dashboard/about'
            render={props => <About sectionId={sectionId} />}
          />
          <Route
            path='/dashboard/about/edit/:id'
            render={props => <EditAbout />}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
