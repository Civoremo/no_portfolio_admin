/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";

const Projects = () => {
  const [projects, setProjects] = useState(null);

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
  }, []);

  const displayProjects = () => {
    return projects.map(project => {
      return (
        <div key={project.id}>
          <div>
            <img
              style={{ width: "100px", height: "100px" }}
              src={project.gifImage}
              alt={project.title}
            />
          </div>
          <div>{project.title}</div>
          <div>{project.description}</div>
          <div>{project.stack}</div>
          <div>
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
      );
    });
  };

  if (projects === null) {
    return <>Loading ...</>;
  }

  return (
    <div>
      <div>Project component to be displayed here.</div>
      {displayProjects()}
    </div>
  );
};

export default Projects;
