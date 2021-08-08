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
  const [changeCount, setChangeCount] = useState(0);

  const [inputFieldsData, setInputFieldsData] = useState(null);

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

          let tempInputsObject = {};
          for (let item in filtered[0]) {
            tempInputsObject[item] = filtered[0][item];
          }

          setInputFieldsData(tempInputsObject);
          setProjectInfo(filtered);
        } else {
          alert("Something went wrong with fetching project data.");
        }
      })
      .catch(err => {
        // console.log("something went wrong with fetching projects");
        alert("Failed to fetch Project data!");
      });
  }, [id, changeCount]);

  const updateProjectImage = imageURL => {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/projects/update`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      data: {
        id: id,
        gifImage: imageURL,
      },
      responseType: "json",
    })
      .then(result => {
        // console.log("gif image updated");
        if (result.status === 200) {
          setChangeCount(changeCount + 1);
        } else {
          alert("Something went wrong with updating image for project.");
        }
      })
      .catch(err => {
        alert("Failed to update gif image for project!");
      });
  };

  const uploadImage = (e, files) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_GIF_PRESET);

    const config = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    };

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_IMAGE_CLOUD_NAME}/image/upload`,
        formData,
        config
      )
      .then(result => {
        // console.log("image uploaded", result);
        if (result.status === 200) {
          updateProjectImage(result.data.secure_url);
        } else {
          alert("Something went wrong with uploading image to cloudinary!");
        }
      })
      .catch(err => {
        // console.log("failed to upload image");
        alert("Failed to upload to Cloudinary!");
      });
  };

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
          <input
            type='file'
            multiple={false}
            onChange={event => uploadImage(event, event.target.files)}
          />
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
              placeholder={inputFieldsData.title || "Project Title ..."}
              value={inputFieldsData.title || ""}
              required
              autoComplete='off'
              onChange={event =>
                setInputFieldsData(inputFieldsData => ({
                  ...inputFieldsData,
                  title: event.target.value,
                }))
              }
            />
            <br />
            <label>Description (req)</label>
            <textarea
              style={{ resize: "none" }}
              cols='50'
              rows='10'
              name='Project Description'
              placeholder={
                inputFieldsData.description || "Project Description ..."
              }
              value={inputFieldsData.description || ""}
              required
              autoComplete='off'
              onChange={event =>
                setInputFieldsData(inputFieldsData => ({
                  ...inputFieldsData,
                  description: event.target.value,
                }))
              }
            />
            <br />
            <label>Stack</label>
            <textarea
              style={{ resize: "none" }}
              cols='50'
              rows='5'
              name='Project Stack'
              placeholder={inputFieldsData.stack || "Project Stack ..."}
              value={inputFieldsData.stack || ""}
              onChange={event =>
                setInputFieldsData(inputFieldsData => ({
                  ...inputFieldsData,
                  stack: event.target.value,
                }))
              }
            />
            <button onClick={event => removeData(event, "stack")}>Clear</button>
            <br />
            <label>Live Link</label>
            <input
              type='text'
              name='Project Live Link'
              placeholder={inputFieldsData.liveLink || "Project Live Link ..."}
              value={inputFieldsData.liveLink || ""}
              onChange={event =>
                setInputFieldsData(inputFieldsData => ({
                  ...inputFieldsData,
                  liveLink: event.target.value,
                }))
              }
            />
            <button onClick={event => removeData(event, "liveLink")}>
              Clear
            </button>
            <label>Frontend Link</label>
            <input
              type='text'
              name='Project Frontend Link'
              placeholder={
                inputFieldsData.frontendLink || "Project Frontend Link ..."
              }
              value={inputFieldsData.frontendLink || ""}
              onChange={event =>
                setInputFieldsData(inputFieldsData => ({
                  ...inputFieldsData,
                  frontendLink: event.target.value,
                }))
              }
            />
            <button onClick={event => removeData(event, "frontendLink")}>
              Clear
            </button>
            <label>Backend Link</label>
            <input
              type='text'
              name='backendLink'
              placeholder={
                inputFieldsData.backendLink || "Project Backend Link ..."
              }
              value={inputFieldsData.backendLink || ""}
              onChange={event =>
                setInputFieldsData(inputFieldsData => ({
                  ...inputFieldsData,
                  backendLink: event.target.value,
                }))
              }
            />
            <button onClick={event => removeData(event, "backendLink")}>
              Clear
            </button>
          </form>
          <br />
          <div>
            <button onClick={event => saveProjectData(event)}>
              Save Changes
            </button>
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

  const setNewData = () => {
    let updatedData = {
      id: id,
      title: titleInput === "" ? projectInfo[0].title : titleInput,
      description:
        descriptionInput === "" ? projectInfo[0].title : descriptionInput,
      stack:
        // if input is empty and project stack data is null
        stackInput === "" && projectInfo[0].stack === null
          ? // leave it as null
            null
          : //otherwise, if input is empty but project stack data has info
          stackInput === "" && projectInfo[0].stack !== null
          ? // leave it as the data it already has
            projectInfo[0].stack
          : // otherwise, set project stack data as the new input text
            stackInput,
      liveLink:
        // input is empty and data is null
        liveLinkInput === "" && projectInfo[0].liveLink === null
          ? // leave as null
            null
          : // if input is empty but data has info
          liveLinkInput === "" && projectInfo[0].liveLink !== null
          ? // leave exsisting data
            projectInfo[0].liveLink
          : // otherwise set new input data
            liveLinkInput,
      frontendLink:
        // input is empty and data is null
        frontendInput === "" && projectInfo[0].frontendLink === null
          ? // leave as null
            null
          : // if input is empty but data has info
          frontendInput === "" && projectInfo[0].frontendLink !== null
          ? // leave existing data
            projectInfo[0].frontendLink
          : // otherwise set new input data
            frontendInput,
      backendLink:
        // input is empty and data is null
        backendInput === "" && projectInfo[0].backendLink === null
          ? // leave as null
            null
          : // if input is empty but data has info
          backendInput === "" && projectInfo[0].backendLink !== null
          ? // leave existing data
            projectInfo[0].backendLink
          : // otherwise set new input data
            backendInput,
    };

    return updatedData;
  };

  const saveProjectData = e => {
    e.preventDefault();

    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/projects/update`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      data: inputFieldsData,
      responseType: "json",
    })
      .then(result => {
        // console.log("update project info", result);
        if (result.status === 200) {
          setChangeCount(changeCount + 1);
        } else {
          alert("Something went wrong with update of project info.");
        }
      })
      .catch(err => {
        // console.log("Failed to update project info.");
        alert("Failed to update project info!");
      });
  };

  const removeData = (e, name) => {
    e.preventDefault();

    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/projects/update`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      data: {
        id: id,
        [name]: null,
      },
      responseType: "json",
    })
      .then(result => {
        // console.log("set data to null", result);
        if (result.status === 200) {
          setChangeCount(changeCount + 1);
        } else {
          alert("Something went wrong with removing data!");
        }
      })
      .catch(err => {
        // console.log("failed to set data to null");
        alert("Failed to set data to null!");
      });
  };

  if (projectInfo === null || inputFieldsData === null) {
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
