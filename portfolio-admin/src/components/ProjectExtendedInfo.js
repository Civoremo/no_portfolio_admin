/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const ProjectExtendedInfo = () => {
  let { id } = useParams();
  let historyRedirect = useHistory();
  const [projectExtendedInfo, setProjectExtendedInfo] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/projects/info/${id}`,
      responseType: "json",
    })
      .then(result => {
        console.log("project info", result);
        if (result.status === 200) {
          setProjectExtendedInfo(result.data);
        } else {
          alert("Something went wrong fetching Extended project info!");
        }
      })
      .catch(err => {
        console.log("something went wrong with getting project info");
        alert("Failed to get Extended Project Info!");
      });
  }, [id]);

  const displayExtendedProjectData = e => {
    // e.preventDefault();
    return (
      <div>
        <div>Extended Description</div>
        <hr />
        <div style={{ border: "1px solid grey", padding: "20px 20px" }}>
          <div
            style={{
              display: projectExtendedInfo[0].link !== null ? "block" : "none",
            }}
          >
            <a href={projectExtendedInfo[0].link}>Additional Link</a>
          </div>
          <br />
          {projectExtendedInfo[0].description}
        </div>
        <br />
        <br />
        <div>Carousel Images</div>
        <hr />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {projectExtendedInfo[1].map(image => {
            return (
              <div key={image.id}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "auto",
                      height: "200px",
                      margin: "20px 20px 0 20px",
                    }}
                    src={image.image}
                    alt={image.id + " image"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const editExdendedInfo = e => {
    e.preventDefault();
    historyRedirect.push(`/dashboard/projects/extended/${id}/edit`);
  };

  if (projectExtendedInfo === null) {
    return <>Loading ...</>;
  }

  return (
    <div>
      {/* <div>Extended Project Info Component</div> */}
      <div
        className='content-interaction-buttons'
        onClick={event => editExdendedInfo(event)}
      >
        Edit
      </div>
      <br />
      <br />
      <div>{displayExtendedProjectData()}</div>
    </div>
  );
};

export default ProjectExtendedInfo;
