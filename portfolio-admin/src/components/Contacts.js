/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Contacts = () => {
  let historyRedirect = useHistory();
  const [contactsInfo, setContactsInfo] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/contact/info`,
      responseType: "json",
    })
      .then(result => {
        console.log("contact", result);
        if (result.status === 200) {
          setContactsInfo(result.data);
        } else {
          alert("Something went wrong with fetching contact info.");
        }
      })
      .catch(err => {
        alert("Failed to get contact info!");
      });
  }, []);

  const editContact = e => {
    e.preventDefault();
    historyRedirect.push(`/dashboard/contact/${contactsInfo[0].id}/edit`);
  };

  const displayContactInfo = () => {
    return (
      <div>
        <div>
          {/* <label>Current Location</label> */}
          <div>{contactsInfo[0].location}</div>
          <br />
          {/* <label>Contact Email</label> */}
          <div>{contactsInfo[0].email}</div>
        </div>
        <br />
        <hr />
        <br />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {contactsInfo[1].map(social => {
            return (
              <div key={social.id} style={{ margin: "20px 20px" }}>
                <a href={social.link}>
                  <img
                    style={{ width: "auto", height: "100px" }}
                    src={social.image}
                    alt={social.platform_title + " logo"}
                  />
                </a>
                <div>{social.platform_title}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (contactsInfo === null) {
    return <>Loading ...</>;
  }

  return (
    <div>
      {/* <div>contact component goes here</div> */}
      <div
        className='content-interaction-buttons'
        onClick={event => editContact(event)}
      >
        Edit
      </div>
      <br />
      <hr />
      <br />
      <div>{displayContactInfo()}</div>
    </div>
  );
};

export default Contacts;
