/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";

const About = () => {
  const [aboutContent, setAboutContent] = useState(null);

  const editContent = (e, sectionId) => {
    e.preventDefault();
    console.log("edit button clicked", sectionId);
  };

  const deleteContent = (e, sectionId) => {
    e.preventDefault();
    console.log("delete button clicked", sectionId);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/about/all`,
      //   headers: {},
      responseType: "json",
    })
      .then(result => {
        console.log("about result", result);
        setAboutContent(result.data);
      })
      .catch(err => {
        console.log("about content failed to fetch");
      });
  }, []);

  const displayAboutContent = () => {
    return aboutContent.map(section => {
      //   console.log("section", section);
      return (
        <div key={section[0].id}>
          <div
            style={{
              display: "flex",
              // border: "1px solid red",
              width: "80px",
              justifyContent: "space-between",
            }}
          >
            <div
              className='content-interaction-buttons'
              onClick={event => editContent(event, section[0].id)}
            >
              Edit
            </div>
            <div
              className='content-interaction-buttons'
              onClick={event => deleteContent(event, section[0].id)}
            >
              Delete
            </div>
          </div>
          <h2
            style={{
              textAlign: "left",
              margin: "0 70px 30px 70px",
              fontFamily: "Nunito",
              color: "#DC3545",
            }}
          >
            {section[0].title}
          </h2>
          <br />
          <div>
            {section[1].map(content => {
              //   console.log("content", content);
              return (
                <div
                  key={content.id}
                  style={{
                    display: "flex",
                    margin: "0 100px 0 100px",
                  }}
                >
                  <div
                    style={{
                      margin: "0 0 20px 50px",
                    }}
                  >
                    {content.textContent}
                  </div>
                </div>
              );
            })}
          </div>
          <br />
        </div>
      );
    });
  };

  if (aboutContent === null) {
    return <>Loading</>;
  }

  return (
    <div>
      {/* <div>about component goes here</div> */}
      <div>{displayAboutContent()}</div>
    </div>
  );
};

export default About;
