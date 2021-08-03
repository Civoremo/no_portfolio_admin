/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";

const AddAbout = ({ showAddNewAbout, setShowAddNewAbout }) => {
  const [titleValue, setTitleValue] = useState("");

  useEffect(() => {
    setTitleValue("");
  }, [showAddNewAbout]);

  const saveNewAbout = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/about/section/register`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      data: {
        title: titleValue,
      },
      responseType: "json",
    })
      .then(result => {
        // console.log("after adding new About Section", result);
        if (result.status === 201) {
          setShowAddNewAbout(!showAddNewAbout);
        } else {
          alert("Failed to POST new About Section.");
        }
      })
      .catch(err => {
        // console.log("adding new about section failed", err);
        alert("Something went wrong with POSTING!");
      });
  };

  return (
    <div>
      {/* <div>Add About Component goes here</div> */}
      <form>
        <input
          type='text'
          name='About Section Title'
          placeholder='Title'
          autoComplete='off'
          required
          value={titleValue}
          onChange={event => setTitleValue(event.target.value)}
        />
        <button onClick={event => saveNewAbout(event)}>Save</button>
      </form>
    </div>
  );
};

export default AddAbout;
