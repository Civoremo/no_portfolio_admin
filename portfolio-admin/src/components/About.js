/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AddAbout from "./AddAbout";

const About = () => {
  let historyRedirect = useHistory();
  const [aboutContent, setAboutContent] = useState(null);
  const [showAddNewAbout, setShowAddNewAbout] = useState(false);
  const [contentChange, setContentChange] = useState(0);

  const editContent = (e, id) => {
    e.preventDefault();
    // console.log("edit button clicked", id);
    historyRedirect.push(`/dashboard/about/edit/${id}`);
  };

  const deleteContent = (e, id) => {
    e.preventDefault();
    const deleteCheck = window.confirm(
      "Are  you sure you want to delete this section?"
    );

    if (deleteCheck) {
      // console.log("delete button clicked", id);
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}/about/section/delete`,
        headers: {
          authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
        },
        data: {
          id: id,
        },
        responseType: "json",
      })
        .then(result => {
          // console.log("deleted section", result);
          setContentChange(contentChange + 1);
        })
        .catch(err => {
          // console.log("failed to delete section", err);
          alert("Failed to delete Section!");
        });
    }
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/about/all`,
      //   headers: {},
      responseType: "json",
    })
      .then(result => {
        // console.log("about result", result);
        setAboutContent(result.data);
      })
      .catch(err => {
        // console.log("about content failed to fetch");
        alert("Failed to delete Section!");
      });
  }, [showAddNewAbout, contentChange]);

  const displayAboutContent = () => {
    return aboutContent.map(section => {
      //   console.log("section", section);
      return (
        <div
          key={section[0].id}
          style={{ border: "1px solid grey", marginBottom: "20px" }}
        >
          <div
            style={{
              display: "flex",
              // border: "1px solid red",
              width: "80px",
              justifyContent: "space-between",
              marginLeft: "20px",
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
          <hr />
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
                    whiteSpace: "pre-wrap",
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

  const addNewAbout = () => {
    // console.log("show add component");
    setShowAddNewAbout(!showAddNewAbout);
  };

  if (aboutContent === null) {
    return <>Loading</>;
  }

  return (
    <div>
      {/* <div>about component goes here</div> */}
      <div
        className='content-interaction-buttons'
        onClick={event => addNewAbout()}
      >
        {showAddNewAbout ? "Cancel" : "Add New +"}
      </div>
      <br />
      <div style={{ display: showAddNewAbout ? "block" : "none" }}>
        <AddAbout
          showAddNewAbout={showAddNewAbout}
          setShowAddNewAbout={setShowAddNewAbout}
        />
      </div>
      <br />
      <div>{displayAboutContent()}</div>
    </div>
  );
};

export default About;
