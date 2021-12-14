import React from "react";
import axios from "axios";

import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import assert from "assert";

const isLoggedIn = () => {
  return localStorage.getItem("userToken") !== null;
};

// Function to retrieve a text representation of time passed
const retrieveTime = (date) => {
  console.log("new date passed in: ", date);
  if (date == null) return "4h";
  // Removing GMT from time
  // const timeString = date.replace(" GMT", "");
  // ^ this line above doesn't allow you to replace anything

  const endTime = Date.now();
  const startTime = Date.parse(date);

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
};

// Function to increment the like of a comment
const incrementLikeCount = (commentId) => {
  if (!isLoggedIn) return;

  const userToken = localStorage.getItem("userToken");
  const configs = {
    headers: {Authorization: `Bearer ${userToken}`}
  }
  const URL = `http://127.0.0.1:5000/api/likecomment`;
  const payload = {"commentId": commentId}
  axios
    .post(URL, payload, configs)
    .then((response) => assert(response["data"]["status"] === "success"))
    .catch((err) => console.log(err));
};

// Function to increment the dislike of a comment
const incrementDislikeCount = (commentId) => {
  if (!isLoggedIn) return;

  const userToken = localStorage.getItem("userToken");

  const URL = `http://127.0.0.1:5000/api/dislikecomment`;
  const configs = {
    headers: {Authorization: `Bearer ${userToken}`}
  }
  const payload = {"commentId": commentId}
  axios
    .post(URL, payload, configs)
    .then((response) => assert(response["data"]["status"] === "success"))
    .catch((err) => console.log(err));
};

const CommentCell = (props) => {
  const commentId = props.commentId || "";
  const username = props.username || "";
  const image = props.image || "";
  const date = props.date || "";
  const text = props.text || "";
  const likeCount = props.likeCount || 0;
  const dislikeCount = props.dislikeCount || 0;
  return (
    <div className="comment-cell">
      <h3 className="comment-name">{username}</h3>
      <img className="comment-image" src={image} />
      <h3 className="comment-time">{retrieveTime(date)}</h3>

      <p className="comment">{text}</p>

      <div className="like-area" onClick={incrementLikeCount(commentId)}>
        <FaThumbsUp />
        <p>{likeCount}</p>
      </div>

      <div className="dislike-area" onClick={incrementDislikeCount(commentId)}>
        <FaThumbsDown />
        <p>{dislikeCount}</p>
      </div>
    </div>
  );
};

export default CommentCell;
