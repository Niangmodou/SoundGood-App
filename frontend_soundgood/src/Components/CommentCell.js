import React, { Component, useState } from "react";
import axios from "axios";

import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import assert from "assert";


class CommentCell extends Component {
  constructor(props) {
    super(props)

    this.state = {
      commentId: null,
      username: "",
      image: null,
      date: null,
      text: "",
      likeCount: 0,
      dislikeCount: 0
    }
  }

  componentDidMount() {
    const commentId = this.props.commentId
   

    const username = this.props.username 
    const image = this.props.image
    const date = this.props.datePosted 
    const text = this.props.text 
    const likeCount = this.props.likeCount 
    const dislikeCount = this.props.dislikeCount 

    this.setState({commentId: commentId, username: username, image: image, date: date, text: text, likeCount: likeCount, dislikeCount: dislikeCount})

  }

  isLoggedIn = () => {
    return localStorage.getItem("userToken") !== null;
  };
  
  // Function to retrieve a text representation of time passed
  retrieveTime = () => {
    console.log("new date passed in: ", this.date);
    if (this.date == null) return "4h";
    // Removing GMT from time
    const timeString = this.date.replace(" GMT", "");
  
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
  };

  // Function to increment the like of a comment
  incrementLikeCount = () => {
    if (!this.isLoggedIn) return;

    const userToken = localStorage.getItem("userToken");
    const configs = {
      headers: {Authorization: `Bearer ${userToken}`}
    }
    const URL = `http://127.0.0.1:5000/api/likecomment`;
    const payload = {"commentId": this.state.commentId}
    axios
      .post(URL, payload, configs)
      .then((response) => {
        console.log(response)
        assert(response["data"]["status"] === "success")
      })
      .catch((err) => console.log(err));
      window.location.reload(false);
  };

    // Function to increment the dislike of a comment
  incrementDislikeCount = () => {
    if (!this.isLoggedIn) return;

    const userToken = localStorage.getItem("userToken");
    const URL = `http://127.0.0.1:5000/api/dislikecomment`;
    const configs = {
      headers: {Authorization: `Bearer ${userToken}`}
    }
    const payload = {"commentId": this.state.commentId}
    axios
      .post(URL, payload, configs)
      .then((response) => assert(response["data"]["status"] === "success"))
      .catch((err) => console.log(err));
      window.location.reload(false);
  };

  render() {
      return (
          <div className="comment-cell">
            <h3 className="comment-name">{this.state.username}</h3>
            <img className="comment-image" src={this.state.image} />
            <h3 className="comment-time">{this.retrieveTime}</h3>

            <p className="comment">{this.state.text}</p>

            <div className="like-area" >
              <FaThumbsUp 
                onClick={this.incrementLikeCount}
              />
              <p>{this.state.likeCount}</p>
            </div>

            <div className="dislike-area">
              <FaThumbsDown 
                onClick={this.incrementDislikeCount}
              />
              <p>{this.state.dislikeCount}</p>
            </div>
          </div>
      );
  }


}

export default CommentCell;
