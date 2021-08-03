/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditAbout = () => {
  let { id } = useParams();
  const [aboutContent, setAboutContent] = useState(null);
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionContent, setSectionContent] = useState([]);
  const [contentInput, setContentInput] = useState("");
  const [contentId, setContentId] = useState(null);
  const [changeCount, setChangeCount] = useState(0);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/about/${id}`,
      responseType: "json",
    })
      .then(result => {
        setAboutContent(result.data);
        setSectionTitle(result.data[0].title);

        const sortedContentByAscId = result.data[1].sort((a, b) => {
          return a.id - b.id;
        });
        setSectionContent(sortedContentByAscId);
      })
      .catch(err => {
        console.log("about content by ID failed to fetch");
      });
  }, [id, changeCount]);

  const saveContent = (e, id) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/about/content/update`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      data: {
        id: id,
        textContent: contentInput,
      },
      responseType: "json",
    })
      .then(result => {
        if (result.status === 200) {
          setChangeCount(changeCount + 1);
        } else {
          alert("Something went wrong with update");
        }
      })
      .catch(err => {
        alert("Failed to update content!");
      });
  };

  const displaySectionContent = () => {
    return sectionContent.map((content, index) => {
      return (
        <div key={index}>
          <textarea
            placeholder={content.textContent}
            cols='80'
            rows='10'
            value={
              contentInput.length > 0 && content.id === contentId
                ? contentInput
                : sectionContent[index].textContent
            }
            onFocus={event => {
              setContentInput(event.target.value);
              setContentId(content.id);
            }}
            onChange={event => setContentInput(event.target.value)}
          />
          <button onClick={event => saveContent(event, content.id)}>
            Save
          </button>
          <button>Delete</button>
        </div>
      );
    });
  };

  if (aboutContent === null) {
    return <>Loading...</>;
  }

  return (
    <div>
      <h3>Edit About Content Section</h3>
      <form>
        <input
          type='text'
          name='About Section Title'
          placeholder={aboutContent[0].title}
          autoComplete='off'
          required
          value={sectionTitle}
          onChange={event => {
            setSectionTitle(event.target.value);
          }}
        />
        <button>Save</button>
        <div>{displaySectionContent()}</div>
      </form>
      <div>
        <button>Add New Content</button>
      </div>
    </div>
  );
};

export default EditAbout;
