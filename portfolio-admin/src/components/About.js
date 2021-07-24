/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";

const About = () => {
  const [aboutContent, setAboutContent] = useState(null);

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
          <div>{section[0].title}</div>
          <br />
          <div>
            {section[1].map(content => {
              //   console.log("content", content);
              return <div key={content.id}>{content.textContent}</div>;
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
