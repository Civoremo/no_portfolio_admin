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
  const [socialTitleInput, setSocialTitleInput] = useState("");
  const [socialLinkInput, setSocialLinkInput] = useState("");

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
        <br />
      </div>
    );
  };

  const displaySocialInputs = () => {
    return contactInfo[1].map(social => {
      return (
        <div
          key={social.id}
          style={{
            border: "1px solid grey",
            margin: "10px 10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 10px",
            }}
          >
            <div>
              <button>Delete</button>
              <br />
              <br />
            </div>
            <img
              style={{ width: "auto", height: "100px" }}
              src={social.image}
              alt={social.platform_title + " logo"}
            />
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px 20px",
              }}
            >
              <input type='file' multiple={false} />
              <br />
              <label>Title</label>
              <input
                type='text'
                name='Social Name'
                placeholder={social.platform_title}
                value={socialTitleInput}
                onFocus={event => setSocialTitleInput(social.platform_title)}
                onChange={event => setSocialTitleInput(event.target.value)}
              />
              <button>Save</button>
              <label>Link</label>
              <input
                type='text'
                name='Social Link'
                placeholder={social.link}
                value={socialLinkInput}
                onFocus={event => setSocialLinkInput(social.link)}
                onChange={event => setSocialLinkInput(event.target.value)}
              />
              <button>Save</button>
            </div>
          </div>
        </div>
      );
    });
  };

  if (contactInfo === null) {
    return <>Loading ...</>;
  }

  return (
    <div>
      {/* <div>Edit contact component</div> */}
      <div>{displayContactInputs()}</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {displaySocialInputs()}
      </div>
    </div>
  );
};

export default EditContact;
