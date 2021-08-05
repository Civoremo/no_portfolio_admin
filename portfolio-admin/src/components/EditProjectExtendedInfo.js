/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProjectExtendedInfo = () => {
  let { id } = useParams();
  const [projectInfo, setProjectInfo] = useState(null);
  const [linkInput, setLinkInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [changeCount, setChangeCount] = useState(0);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/projects/info/${id}`,
      responseType: "json",
    })
      .then(result => {
        console.log("project extended info", result);
        if (result.status === 200) {
          setProjectInfo(result.data);
        } else {
          alert("Something went wrong with fetching extended project info.");
        }
      })
      .catch(err => {
        // console.log("failed to fetch ectended project info");
        alert("Failed to fetch extended project info!");
      });
  }, [id, changeCount]);

  const displayProjectInfo = () => {
    return (
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "450px",
          }}
        >
          <label>Link</label>
          <input
            type='text'
            name='Project Additional Link'
            placeholder={
              projectInfo[0].link === null
                ? "Additional Link ..."
                : projectInfo[0].link
            }
            value={linkInput}
            autoComplete='off'
            onFocus={event =>
              projectInfo[0].link !== null
                ? setLinkInput(projectInfo[0].link)
                : setLinkInput("")
            }
            onChange={event => setLinkInput(event.target.value)}
          />
          <label>Description</label>
          <textarea
            style={{ resize: "vertical" }}
            cols='50'
            rows='10'
            name='Project Extended Description'
            placeholder={
              projectInfo[0].description === null
                ? "Extended Project Description ..."
                : projectInfo[0].description
            }
            value={descriptionInput}
            autoComplete='off'
            onFocus={event =>
              projectInfo[0].description !== null
                ? setDescriptionInput(projectInfo[0].description)
                : setDescriptionInput("")
            }
            onChange={event => setDescriptionInput(event.target.value)}
          />
        </form>
        <button>Save</button>
        <button>Reset</button>
      </div>
    );
  };

  if (projectInfo === null) {
    return <>Loading ...</>;
  }

  return (
    <div>
      <div>Edit Extended Project Info Component</div>
      <div>{displayProjectInfo()}</div>
    </div>
  );
};

export default EditProjectExtendedInfo;
