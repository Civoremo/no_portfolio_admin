/** @format */

import axios from "axios";
import React, { useState } from "react";

const AddProject = ({ changeCount, setChangeCount }) => {
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const saveNewProject = e => {
    e.preventDefault();
    if (titleInput.length > 0 && descriptionInput.length > 5) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/projects/register`,
        headers: {
          authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
        },
        data: {
          title: titleInput,
          description: descriptionInput,
        },
        responseType: "json",
      })
        .then(result => {
          // console.log("new project added", result);
          if (result.status === 201) {
            setChangeCount(changeCount + 1);
          } else {
            alert("Something went wrong with POST of new project");
          }
        })
        .catch(err => {
          // console.log("failed to add new project");
          alert("Failed to POST new Project!");
        });
    } else {
      alert("Fill the input fields with more info!");
    }
  };

  return (
    <div>
      <br />
      <form style={{ display: "flex", flexDirection: "column" }}>
        <input
          style={{ resize: "none", width: "400px" }}
          type='text'
          name='Project Name'
          placeholder='Project Title ...'
          required
          autoComplete='off'
          value={titleInput}
          onChange={event => setTitleInput(event.target.value)}
        />
        <br />
        <textarea
          style={{ resize: "none", width: "600px" }}
          required
          placeholder='Project description ...'
          cols='80'
          rows='10'
          value={descriptionInput}
          onChange={event => setDescriptionInput(event.target.value)}
        />
        <button
          style={{ width: "200px" }}
          onClick={event => saveNewProject(event)}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddProject;
