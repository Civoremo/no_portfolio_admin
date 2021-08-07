/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditContact = () => {
  let { id } = useParams();
  const [contactInfo, setContactInfo] = useState(null);
  const [changeCount, setChangeCount] = useState(0);
  const [locationInput, setLocationInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [titleInputFields, settitleInputFields] = useState({});
  const [linkInputFields, setLinkInputFields] = useState({});

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/contact/info`,
      responseType: "json",
    })
      .then(result => {
        // console.log("social", result);
        if (result.status === 200) {
          let tempTitles = {};
          let tempLinks = {};
          for (let social of result.data[1]) {
            tempTitles[social.id] = social.platform_title;
          }
          for (let social of result.data[1]) {
            tempLinks[social.id] = social.link;
          }
          setLinkInputFields(tempLinks);
          settitleInputFields(tempTitles);

          setContactInfo(result.data);
        } else {
          alert("Something went wrong with fetching contact info!");
        }
      })
      .catch(err => {
        alert("Failed to fetch ocntact info!");
      });
  }, [id, changeCount]);

  const updateContactInfo = e => {
    e.preventDefault();

    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/contact/update`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      data: {
        id: parseInt(id),
        location:
          locationInput !== "" && locationInput !== contactInfo[0].location
            ? locationInput
            : contactInfo[0].location,
        email:
          emailInput !== "" && emailInput !== contactInfo[0].email
            ? emailInput
            : contactInfo[0].email,
      },
      responseType: "json",
    })
      .then(result => {
        console.log("update contact", result);
        if (result.status === 200) {
          setChangeCount(changeCount + 1);
        } else {
          alert("Something went wrong with update to contact info!");
        }
      })
      .catch(err => {
        alert("Failed to update contact info!");
      });
  };

  const displayContactInputs = () => {
    return (
      <div>
        <div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "400px",
            }}
          >
            <label>Current Location</label>
            <input
              type='text'
              name='Contact Location'
              placeholder={contactInfo[0].location}
              required
              autoComplete='off'
              value={locationInput}
              onFocus={event => setLocationInput(contactInfo[0].location)}
              onChange={event => setLocationInput(event.target.value)}
            />
            <br />
            <label>Contact Email</label>
            <input
              type='text'
              name='Contact Email'
              placeholder={contactInfo[0].email}
              required
              autoComplete='off'
              value={emailInput}
              onFocus={event => setEmailInput(contactInfo[0].email)}
              onChange={event => setEmailInput(event.target.value)}
            />
          </form>
          <br />
          <button onClick={event => updateContactInfo(event)}>Save</button>
          <br />
          <hr />
        </div>
        <br />
      </div>
    );
  };

  const displaySocialInputs = () => {
    return contactInfo[1].map(social => {
      return (
        <div
          key={social.id}
          style={{
            border: "1px solid grey",
            margin: "10px 10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 10px",
            }}
          >
            <div>
              <button onClick={event => deleteSocialContact(event, social.id)}>
                Delete
              </button>
              <br />
              <br />
            </div>
            <img
              style={{ width: "auto", height: "100px" }}
              src={social.image}
              alt={social.platform_title + " logo"}
            />
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px 20px",
              }}
            >
              <input
                type='file'
                multiple={false}
                onChange={event =>
                  uploadImage(event, event.target.files, social.id)
                }
              />
              <br />
              <label>Title</label>
              <input
                type='text'
                name='Social Name'
                placeholder={social.platform_title}
                autoComplete='off'
                value={titleInputFields[social.id]}
                onChange={event =>
                  settitleInputFields(titleInputFields => ({
                    ...titleInputFields,
                    [social.id]: event.target.value,
                  }))
                }
              />
              <button
                onClick={event =>
                  saveSocialTitle(event, social.id, social.platform_title)
                }
              >
                Save
              </button>
              <label>Link</label>
              <input
                type='text'
                name='Social Link'
                placeholder={social.link}
                autoComplete='off'
                value={linkInputFields[social.id]}
                onChange={event =>
                  setLinkInputFields(linkInputFields => ({
                    ...linkInputFields,
                    [social.id]: event.target.value,
                  }))
                }
              />
              <button
                onClick={event => saveSocialLink(event, social.id, social.link)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const updateSocialImage = (imageURL, id) => {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/contact/social/update`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      data: {
        id: id,
        image: imageURL,
      },
      responseType: "json",
    })
      .then(result => {
        if (result.status === 200) {
          setChangeCount(changeCount + 1);
        } else {
          alert("Something went wrong with updating social image!");
        }
      })
      .catch(err => {
        alert("Failed to update social image!");
      });
  };

  const uploadImage = (e, files, id) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_UPLOAD_SOCIAL_PRESET
    );

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
        if (result.status === 200) {
          updateSocialImage(result.data.secure_url, id);
        } else {
          alert(
            "Something went wrong with uploading social image to cloudinary!"
          );
        }
      })
      .catch(err => {
        alert("Failed to upload to cloudinary!");
      });
  };

  const saveSocialTitle = (e, id, title) => {
    e.preventDefault();
    console.log("title input", titleInputFields[id]);
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/contact/social/update`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      data: {
        id: id,
        platform_title:
          titleInputFields[id] !== "" && titleInputFields[id] !== title
            ? titleInputFields[id]
            : title,
      },
      responseType: "json",
    })
      .then(result => {
        console.log("title save", result);
        if (result.status === 200) {
          resetInputs();
          setChangeCount(changeCount + 1);
        } else {
          alert("Something went wrong with Social Title update!");
        }
      })
      .catch(err => {
        alert("Failed to update Social Title!");
      });
  };

  const saveSocialLink = (e, id, linkURL) => {
    e.preventDefault();
    console.log("link input", linkInputFields[id]);
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/contact/social/update`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      data: {
        id: id,
        link:
          linkInputFields[id] !== "" && linkInputFields[id] !== linkURL
            ? linkInputFields[id]
            : linkURL,
      },
      responseType: "json",
    })
      .then(result => {
        console.log("link save", result);
        if (result.status === 200) {
          resetInputs();
          setChangeCount(changeCount + 1);
        } else {
          alert("Something went wrong with updating social link!");
        }
      })
      .catch(err => {
        alert("Failed to update Social Link!");
      });
  };

  const deleteSocialContact = (e, id) => {
    e.preventDefault();
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/contact/social/delete`,
      headers: {
        authorization: JSON.parse(localStorage.getItem("on_portfolio_token")),
      },
      data: {
        id: id,
      },
      responseType: "json",
    })
      .then(result => {
        if (result.status === 200) {
          resetInputs();
          setChangeCount(changeCount + 1);
        } else {
          alert("Something went wrong with Social Contact Delete!");
        }
      })
      .catch(err => {
        alert("Failed to delete Social Contact!");
      });
  };

  const resetInputs = () => {
    setLocationInput("");
    setEmailInput("");
  };

  if (
    contactInfo === null ||
    titleInputFields === {} ||
    linkInputFields === {}
  ) {
    return <>Loading ...</>;
  }

  return (
    <div>
      <div>{displayContactInputs()}</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {displaySocialInputs()}
      </div>
    </div>
  );
};

export default EditContact;
