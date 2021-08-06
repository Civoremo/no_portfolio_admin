/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";

const Contacts = () => {
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

  if (contactsInfo === null) {
    return <>Loading ...</>;
  }

  return (
    <div>
      <div>contact component goes here</div>
    </div>
  );
};

export default Contacts;
