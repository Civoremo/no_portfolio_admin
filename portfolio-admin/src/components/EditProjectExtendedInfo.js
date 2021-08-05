/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProjectExtendedInfo = () => {
  let { id } = useParams();
  const [projectInfo, setProjectInfo] = useState(null);
  const [linkInput, setLinkInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [changeCount, setChangeCount] = useState(0);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/projects/info/${id}`,
      responseType: "json",
    })
      .then(result => {
        console.log("project extended info", result);
        if (result.status === 200) {
          setProjectInfo(result.data);
        } else {
          alert("Something went wrong with fetching extended project info.");
        }
      })
      .catch(err => {
        // console.log("failed to fetch ectended project info");
        alert("Failed to fetch extended project info!");
      });
  }, [id, changeCount]);

  const displayProjectInfo = () => {
    return (
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "450px",
          }}
        >
          <label>Link</label>
          <input
            type='text'
            name='Project Additional Link'
            placeholder={
              projectInfo[0].link === null
                ? "Additional Link ..."
                : projectInfo[0].link
            }
            value={linkInput}
            autoComplete='off'
            onFocus={event =>
              projectInfo[0].link !== null
                ? setLinkInput(projectInfo[0].link)
                : setLinkInput("")
            }
            onChange={event => setLinkInput(event.target.value)}
          />
          <label>Description</label>
          <textarea
            style={{ resize: "vertical" }}
            cols='50'
            rows='10'
            name='Project Extended Description'
            placeholder={
              projectInfo[0].description === null
                ? "Extended Project Description ..."
                : projectInfo[0].description
            }
            value={descriptionInput}
            autoComplete='off'
            onFocus={event =>
              projectInfo[0].description !== null
                ? setDescriptionInput(projectInfo[0].description)
                : setDescriptionInput("")
            }
            onChange={event => setDescriptionInput(event.target.value)}
          />
        </form>
        <button>Save</button>
        <button>Reset</button>
        <br />
        <hr />
        <br />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {projectInfo[1].map(image => {
            return (
              <div
                key={image.id}
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
                  alt={image.id + " carousel image"}
                />
                <button
                  style={{ width: "200px" }}
                  onClick={event => deleteImageFromCarousel(event, image.id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const uploadImage = (e, files) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_IMAGE_PRESET);

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
          postCrouselImage(result.data.secure_url);
        } else {
          alert("Something went wrong with uploading image to cloudinary!");
        }
      })
      .catch(err => {
        // console.log("failed to upload image");
        alert("Failed to upload to Cloudinary!");
      });
  };

  const postCrouselImage = imageURL => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/projects/image/register`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      data: {
        project_id: id,
        image: imageURL,
      },
      responseType: "json",
    })
      .then(result => {
        // console.log("gif image updated");
        if (result.status === 201) {
          setChangeCount(changeCount + 1);
        } else {
          alert("Something went wrong with updating image for project.");
        }
      })
      .catch(err => {
        alert("Failed to update gif image for project!");
      });
  };

  const deleteImageFromCarousel = (e, id) => {
    e.preventDefault();
    console.log("image ID", id);
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/projects/image/delete`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      data: {
        id: id,
      },
      responseType: "json",
    })
      .then(result => {
        console.log("deleted carousel image", result);
        if (result.status === 200) {
          setChangeCount(changeCount + 1);
        } else {
          alert("Something went wrong deleting carousel image!");
        }
      })
      .catch(err => {
        alert("Failed to delete carousel image!");
      });
  };

  if (projectInfo === null) {
    return <>Loading ...</>;
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Upload Image for Carousel</label>
        <br />
        <input
          type='file'
          multiple={false}
          onChange={event => uploadImage(event, event.target.files)}
        />
      </div>
      <br />
      <hr />
      <div>{displayProjectInfo()}</div>
    </div>
  );
};

export default EditProjectExtendedInfo;
