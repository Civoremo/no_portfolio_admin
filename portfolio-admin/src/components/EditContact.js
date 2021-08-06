/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditContact = () => {
  let { id } = useParams();
  const [contactInfo, setContactInfo] = useState(null);
  const [changeCount, setChangeCount] = useState(0);
  const [locationInput, setLocationInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/contact/info`,
      responseType: "json",
    })
      .then(result => {
        if (result.status === 200) {
          setContactInfo(result.data);
        } else {
          alert("Something went wrong with fetching contact info!");
        }
      })
      .catch(err => {
        alert("Failed to fetch ocntact info!");
      });
  }, [id, changeCount]);

  const updateContactInfo = e => {
    e.preventDefault();

    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/contact/update`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      data: {
        id: parseInt(id),
        location:
          locationInput !== "" && locationInput !== contactInfo[0].location
            ? locationInput
            : contactInfo[0].location,
        email:
          emailInput !== "" && emailInput !== contactInfo[0].email
            ? emailInput
            : contactInfo[0].email,
      },
      responseType: "json",
    })
      .then(result => {
        console.log("update contact", result);
        if (result.status === 200) {
          setChangeCount(changeCount + 1);
        } else {
          alert("Something went wrong with update to contact info!");
        }
      })
      .catch(err => {
        alert("Failed to update contact info!");
      });
  };

  const displayContactInputs = () => {
    return (
      <div>
        <div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "400px",
            }}
          >
            <label>Current Location</label>
            <input
              type='text'
              name='Contact Location'
              placeholder={contactInfo[0].location}
              required
              autoComplete='off'
              value={locationInput}
              onFocus={event => setLocationInput(contactInfo[0].location)}
              onChange={event => setLocationInput(event.target.value)}
            />
            <br />
            <label>Contact Email</label>
            <input
              type='text'
              name='Contact Email'
              placeholder={contactInfo[0].email}
              required
              autoComplete='off'
              value={emailInput}
              onFocus={event => setEmailInput(contactInfo[0].email)}
              onChange={event => setEmailInput(event.target.value)}
            />
          </form>
          <br />
          <button onClick={event => updateContactInfo(event)}>Save</button>
          <br />
          <hr />
        </div>
        <div>our social items</div>
      </div>
    );
  };

  if (contactInfo === null) {
    return <>Loading ...</>;
  }

  return (
    <div>
      {/* <div>Edit contact component</div> */}
      <div>{displayContactInputs()}</div>
    </div>
  );
};

export default EditContact;
