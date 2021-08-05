/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProject = () => {
  let { id } = useParams();
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [stackInput, setStackInput] = useState("");
  const [liveLinkInput, setLiveLinkInput] = useState("");
  const [frontendInput, setFrontendInput] = useState("");
  const [backendInput, setBackendInput] = useState("");
  const [projectInfo, setProjectInfo] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/projects/all`,
      responseType: "json",
    })
      .then(result => {
        // console.log("projects", result);
        if (result.status === 200) {
          let filtered = result.data.filter(
            project => project.id === parseInt(id)
          );

          setProjectInfo(filtered);
        } else {
          alert("Something went wrong with fetching project data.");
        }
      })
      .catch(err => {
        // console.log("something went wrong with fetching projects");
        alert("Failed to fetch Project data!");
      });
  }, [id]);

  const displayProjectData = () => {
    return (
      <div>
        <div>
          <div>
            <img
              style={{ width: "auto", height: "200px" }}
              src={projectInfo[0].gifImage}
              alt={projectInfo[0].title + " gif preview"}
            />
          </div>
          <button>Upload New Gif</button>
        </div>
        <br />
        <div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "450px",
            }}
          >
            <label>Title (req)</label>
            <input
              type='text'
              name='Project Title'
              placeholder={projectInfo[0].title}
              value={titleInput}
              required
              autoComplete='off'
              onFocus={event => setTitleInput(projectInfo[0].title)}
              onChange={event => setTitleInput(event.target.value)}
            />
            <br />
            <label>Description (req)</label>
            <textarea
              style={{ resize: "none" }}
              cols='50'
              rows='10'
              name='Project Description'
              placeholder={projectInfo[0].description}
              value={descriptionInput}
              required
              autoComplete='off'
              onFocus={event => setDescriptionInput(projectInfo[0].description)}
              onChange={event => setDescriptionInput(event.target.value)}
            />
            <br />
            <label>Stack</label>
            <textarea
              style={{ resize: "none" }}
              cols='50'
              rows='5'
              name='Project Stack'
              placeholder={
                projectInfo[0].stack === null
                  ? "Project Stack ..."
                  : projectInfo[0].stack
              }
              value={stackInput}
              onFocus={event =>
                projectInfo[0].stack === null
                  ? ""
                  : setStackInput(projectInfo[0].stack)
              }
              onChange={event => setStackInput(event.target.value)}
            />
            <br />
            <label>Live Link</label>
            <input
              type='text'
              name='Project Live Link'
              placeholder={
                projectInfo[0].liveLink === null
                  ? "Live URL ..."
                  : projectInfo[0].liveLink
              }
              value={liveLinkInput}
              onFocus={event =>
                projectInfo[0].liveLink === null
                  ? ""
                  : setLiveLinkInput(projectInfo[0].liveLink)
              }
              onChange={event => setLiveLinkInput(event.target.value)}
            />
            <label>Frontend Link</label>
            <input
              type='text'
              name='Project Frontend Link'
              placeholder={
                projectInfo[0].frontendLink === null
                  ? "Frontend URL ..."
                  : projectInfo[0].frontendLink
              }
              value={frontendInput}
              onFocus={event =>
                projectInfo[0].frontendLink === null
                  ? setFrontendInput("")
                  : setFrontendInput(projectInfo[0].frontendLink)
              }
              onChange={event => setFrontendInput(event.target.value)}
            />
            <label>Backend Link</label>
            <input
              type='text'
              name='Project Backend Link'
              placeholder={
                projectInfo[0].backendLink === null
                  ? "Backend URL ..."
                  : projectInfo[0].backendLink
              }
              value={backendInput}
              onFocus={event =>
                projectInfo[0].backendLink === null
                  ? ""
                  : setBackendInput(projectInfo[0].backendLink)
              }
              onChange={event => setBackendInput(event.target.value)}
            />
          </form>
          <br />
          <div>
            <button>Save Changes</button>
            <button onClick={event => resetInputFields(event)}>Reset</button>
          </div>
        </div>
      </div>
    );
  };

  const resetInputFields = e => {
    e.preventDefault();
    setTitleInput("");
    setDescriptionInput("");
    setStackInput("");
    setLiveLinkInput("");
    setFrontendInput("");
    setBackendInput("");
  };

  if (projectInfo === null) {
    return <>Loading ...</>;
  }

  return (
    <div>
      {/* {console.log("filtered result", projectInfo)} */}
      {/* <div>Main project info edit component</div> */}
      <div>{displayProjectData()}</div>
    </div>
  );
};

export default EditProject;
