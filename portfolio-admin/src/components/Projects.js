/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "../css/Projects.css";

const Projects = () => {
  let historyRedirect = useHistory();
  const [projects, setProjects] = useState(null);
  const [changeCount, setChangeCount] = useState(0);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/projects/all`,
      responseType: "json",
    })
      .then(result => {
        console.log("projects", result);
        setProjects(result.data);
      })
      .catch(err => {
        console.log("failed to retrieve all projects data");
      });
  }, [changeCount]);

  const editProject = (e, id) => {
    e.preventDefault();
    historyRedirect.push(`/dashboard/projects/edit/${id}`);
  };

  const deleteProject = (e, id) => {
    e.preventDefault();

    let deleteCheck = window.confirm(
      "Are you sure you want to delete this project. Cannot be reversed."
    );

    if (deleteCheck) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}/projects/delete`,
        headers: {
          authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
        },
        data: {
          id: id,
        },
        responseType: "json",
      })
        .then(result => {
          // console.log("project delete", result);
          if (result.status === 200) {
            setChangeCount(changeCount + 1);
          } else {
            alert("Something went wrong with delete.");
          }
        })
        .catch(err => {
          // console.log("Failed to delete Project.");
          alert("Failed to delete Project!");
        });
    }
  };

  const extendedProjectInfo = (e, id) => {
    e.preventDefault();
    historyRedirect.push(`/dashboard/projects/extended/${id}`);
  };

  const displayProjects = () => {
    return projects.map(project => {
      return (
        <div key={project.id} className='card-div'>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={event => editProject(event, project.id)}>
              Edit
            </button>
            <button onClick={event => deleteProject(event, project.id)}>
              Delete
            </button>
            <button onClick={event => extendedProjectInfo(event, project.id)}>
              Extended Info
            </button>
          </div>
          <div className='card-wrapper-div'>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "250px",
              }}
            >
              <img
                // style={{ width: "100px", height: "100px" }}
                style={{ maxWidth: "100%", maxHeight: "15rem" }}
                src={project.gifImage}
                alt={project.title}
              />
            </div>
            <div>
              <div style={{ marginBottom: "20px" }}>
                <h5>{project.title}</h5>
                <p>{project.description}</p>
              </div>
              <div>
                <h4>Stack</h4>
                {project.stack}
              </div>
              <div>
                <h4>Links</h4>
                {project.liveLink !== null ? (
                  <a href={project.liveLink}>Live</a>
                ) : null}
                {project.frontendLink !== null ? (
                  <a href={project.frontendLink}>Frontend</a>
                ) : null}
                {project.backendLink !== null ? (
                  <a href={project.backendLink}>Backend</a>
                ) : null}
              </div>
              <br />
            </div>
          </div>
        </div>
      );
    });
  };

  if (projects === null) {
    return <>Loading ...</>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {/* <div>Project component to be displayed here.</div> */}
      {displayProjects()}
    </div>
  );
};

export default Projects;
