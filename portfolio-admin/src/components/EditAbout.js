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
  const [showAddNewContent, setShowAddNewContent] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/about/${id}`,
      responseType: "json",
    })
      .then(result => {
        setAboutContent(result.data);
        setSectionTitle(result.data[0].title);

        // const sortedContentByAscId = result.data[1].sort((a, b) => {
        //   return a.id - b.id;
        // });
        setSectionContent(result.data[1]);
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
          afterChangeCleanUp();
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
              setShowAddNewContent(false);
            }}
            onChange={event => setContentInput(event.target.value)}
          />
          <button onClick={event => saveContent(event, content.id)}>
            Save
          </button>
          <button onClick={event => deleteContent(event, content.id)}>
            Delete
          </button>
        </div>
      );
    });
  };

  const deleteContent = (e, id) => {
    e.preventDefault();
    let deleteCheck = window.confirm(
      "Are you sure you want to delete the content?"
    );

    if (deleteCheck) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}/about/content/delete`,
        headers: {
          authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
        },
        data: {
          id: id,
        },
        responseType: "json",
      })
        .then(result => {
          console.log("deleted content", result);
          if (result.status === 200) {
            setChangeCount(changeCount + 1);
            afterChangeCleanUp();
          } else {
            alert("Something went wrong with deleting content!", result.status);
          }
        })
        .catch(err => {
          console.log("failed to delete content");
          alert("Failed to delete content!");
        });
    }
  };

  const saveNewContent = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/about/content/register`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      data: {
        about_id: id,
        textContent: contentInput,
      },
      responseType: "json",
    })
      .then(result => {
        // console.log("new content added", result);
        if (result.status === 201) {
          setChangeCount(changeCount + 1);
          afterChangeCleanUp();
        } else {
          alert(
            "Something went wrong with POSTING new content!",
            result.status
          );
        }
      })
      .catch(err => {
        // console.log("failed to post new content");
        alert("Failed to POST new content!");
      });
  };

  const addNewContent = () => {
    // e.preventDefault();
    return (
      <div>
        <form>
          <textarea
            placeholder='Type content here ...'
            cols='80'
            rows='10'
            value={contentInput}
            onFocus={event => {
              setContentInput("");
              setContentId(null);
            }}
            onChange={event => setContentInput(event.target.value)}
          />
          <button onClick={event => saveNewContent(event)}>Save</button>
        </form>
      </div>
    );
  };

  const saveTitle = e => {
    e.preventDefault();
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/about/section/update`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      data: {
        id: id,
        title: sectionTitle,
      },
      responseType: "json",
    })
      .then(result => {
        // console.log("title update result", result);
        if (result.status === 200) {
          setChangeCount(changeCount + 1);
          afterChangeCleanUp();
        } else {
          alert("Failed to PUT section title!", result.status);
        }
      })
      .catch(err => {
        alert("Something went wrong with updating Section Title!");
      });
  };

  const afterChangeCleanUp = () => {
    setContentInput("");
    setShowAddNewContent(false);
    setSectionTitle("");
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
        <button onClick={event => saveTitle(event)}>Save</button>
        <div>{displaySectionContent()}</div>
      </form>
      <div>
        <button
          onClick={event => {
            setShowAddNewContent(!showAddNewContent);
            if (!showAddNewContent) setContentInput("");
          }}
        >
          {showAddNewContent ? "Cancel" : "Add New Content"}
        </button>
        <div style={{ display: showAddNewContent ? "block" : "none" }}>
          {addNewContent()}
        </div>
      </div>
    </div>
  );
};

export default EditAbout;
