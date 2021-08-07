/** @format */

import axios from "axios";
import React, { useState } from "react";

const AddSocial = ({ changeCount, setChangeCount, setShowAdd, contactID }) => {
  const [socialTitleInput, setSocialTitleInput] = useState("");
  const [socialLinkInput, setSocialLinkInput] = useState("");

  const saveNewSocial = e => {
    e.preventDefault();

    console.log(
      "new social data",
      socialLinkInput,
      socialTitleInput,
      typeof contactID,
      contactID
    );

    if (socialLinkInput !== "" || socialTitleInput !== "") {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/contact/social/register`,
        headers: {
          authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
        },
        data: {
          platform_title: socialTitleInput,
          link: socialLinkInput,
          contact_id: parseInt(contactID),
        },
        responseType: "json",
      })
        .then(result => {
          if (result.status === 201) {
            setChangeCount(changeCount + 1);
            setShowAdd(false);
          } else {
            alert(
              "Something went wrong with posting new social platform contact!"
            );
          }
        })
        .catch(err => {
          alert("Failed to post new social platform contact!");
        });
    } else {
      alert("Fill out all the input fields!");
    }
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}
      >
        <input
          type='text'
          name='Social Title'
          placeholder='Social Title ...'
          required
          autoComplete='off'
          value={socialTitleInput}
          onChange={event => setSocialTitleInput(event.target.value)}
        />
        <input
          type='text'
          name='Social Link'
          placeholder='Social Link ...'
          required
          autoComplete='off'
          value={socialLinkInput}
          onChange={event => setSocialLinkInput(event.target.value)}
        />
      </form>
      <button onClick={event => saveNewSocial(event)}>Save</button>
    </div>
  );
};

export default AddSocial;
