/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditAbout = () => {
  let { id } = useParams();
  const [aboutContent, setAboutContent] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/about/${id}`,
      responseType: "json",
    })
      .then(result => {
        setAboutContent(result.data);
      })
      .catch(err => {
        console.log("about content by ID failed to fetch");
      });
  }, [id]);

  if (aboutContent === null) {
    return <>Loading...</>;
  }

  return (
    <div>
      {console.log("fetching content by id", aboutContent)}
      <div>edit content goes here</div>
    </div>
  );
};

export default EditAbout;
