/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProjectExtendedInfo = () => {
  let { id } = useParams();
  const [projectExtendedInfo, setProjectExtendedInfo] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/projects/info/${id}`,
      responseType: "json",
    })
      .then(result => {
        //   console.log("project info", result);
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
        <p>{projectExtendedInfo[0].description}</p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {projectExtendedInfo[1].map(image => {
            return (
              <div key={image.id}>
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    margin: "20px 20px",
                  }}
                  src={image.image}
                  alt={image.id + " image"}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (projectExtendedInfo === null) {
    return <>Loading ...</>;
  }

  return (
    <div>
      {/* <div>Extended Project Info Component</div> */}
      <div>{displayExtendedProjectData()}</div>
    </div>
  );
};

export default ProjectExtendedInfo;
