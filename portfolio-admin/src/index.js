/** @format */

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./css/index.css";
import reportWebVitals from "./reportWebVitals";

import App from "./components/App";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <React.StrictMode>
      <Switch>
        <Route exact={true} path={"/"} component={App} />
        <Route path={"/login"} component={Login} />
        <Route path={"/dashboard"} component={Dashboard} />
      </Switch>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
