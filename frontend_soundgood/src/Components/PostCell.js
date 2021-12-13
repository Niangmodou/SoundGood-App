import { IconContext } from "react-icons";
import React from "react";
import PlayIcon from "../Icons/RecordIcon.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Css/PostCell.css";
import { FaRegPlayCircle } from "react-icons/fa";

// Function to retrieve a text representation of time passed
const retrieveTime = (datePosted) => {
  if (datePosted == null) return "4h";
  // Removing GMT from time
  const timeString = datePosted.replace(" GMT", "");

  const endTime = Date.now();
  const startTime = Date.parse(timeString);

  // time difference in ms
  let timeDiff = endTime - startTime;
  // strip the ms
  timeDiff /= 1000;

  // get seconds
  let seconds = Math.round(timeDiff % 60);

  // remove seconds from the date
  timeDiff = Math.floor(timeDiff / 60);

  // get minutes
  let minutes = Math.round(timeDiff % 60);

  // remove minutes from the date
  timeDiff = Math.floor(timeDiff / 60);

  // get hours
  let hours = Math.round(timeDiff % 24);

  // remove hours from the date
  timeDiff = Math.floor(timeDiff / 24);

  // the rest of timeDiff is number of days
  let days = timeDiff;

  if (days !== 0) {
    return String(days) + "d";
  } else if (hours !== 0) {
    return String(hours) + "h";
  } else if (minutes !== 0) {
    return String(minutes) + "m";
  } else if (seconds !== 0) {
    return String(seconds) + "s";
  }

  // TODO: Account for the possibility of mmonths
};

const PostCell = ({ username, image, datePosted, text, postID }) => {
  const [postId, setPostId] = useState("");
  useEffect(() => {
    setPostId(postId);
  }, []);

  return (
    <Link to="/post" state={postID}>
      <div className="post-cell">
        <div className="topLevel">
          <div>
            <h3 className="post-name-area">{username}</h3>
            <p className="post-description">{text}</p>
          </div>
          <h3 className="post-time">{retrieveTime(datePosted)}</h3>
        </div>
        <div className="bottomLevel">
          {/* <img className="post-image" src={image} /> */}
          <div>Picture</div>
          <IconContext.Provider value={{ className: "btn" }}>
            <FaRegPlayCircle />
          </IconContext.Provider>
        </div>
      </div>
    </Link>
  );
};

export default PostCell;
