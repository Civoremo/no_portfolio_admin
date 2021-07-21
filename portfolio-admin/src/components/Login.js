/** @format */
import "../css/App.css";
import "../css/login.css";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  let historyRedirect = useHistory();
  const [typedEmail, setTypedEmail] = useState("");
  const [typedPassword, setTypedPassword] = useState("");

  const logIn = e => {
    e.preventDefault();
    if (typedEmail.length || typedPassword.length !== 0) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/users/login`,
        headers: {},
        data: {
          email: typedEmail,
          password: typedPassword,
        },
        responseType: "json",
      })
        .then(result => {
          console.log("login result", result);
          if (result.status === 204) {
            setTypedEmail("");
            setTypedPassword("");
            alert("Login Failed");
          } else {
            localStorage.setItem(
              "on_portfolio_token",
              JSON.stringify(result.data.token)
            );
            localStorage.setItem(
              "on_portfolio_user",
              JSON.stringify(result.data.user)
            );
            setTypedEmail("");
            setTypedPassword("");
            // historyRedirect.push("/dashboard");
          }
        })
        .catch(err => {
          console.log("LOGIN ERROR", err);
        });
    } else {
      alert("Check input fields and try again!");
    }
  };

  return (
    <div className='App-header'>
      {/* <div>Login in component</div> */}
      <div>Login Page</div>
      <div>
        <form className='form-container'>
          <input
            input='text'
            placeholder='email'
            autoComplete='on'
            required
            value={typedEmail}
            onChange={event => setTypedEmail(event.target.value)}
          />
          <input
            input='text'
            type='password'
            autoComplete='off'
            placeholder='password'
            required
            value={typedPassword}
            onChange={event => setTypedPassword(event.target.value)}
          />
          <button onClick={logIn}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
