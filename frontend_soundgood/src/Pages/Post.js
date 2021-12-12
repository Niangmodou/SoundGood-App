import { IconContext } from "react-icons";
import React from "react";
import axios from "axios";
import CommentCell from "../Components/CommentCell";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import "../Css/Post.css";

export default function Post() {
  const location = useLocation();
  const postID = location.state;

  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState(
    "https://www.rollingstone.com/wp-content/uploads/2019/12/JuiceWrld.jpg"
  );
  const [postText, setPostText] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [recentResults, setRecentResults] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [topTwoResults, setTopTwoResults] = useState([]);
  const[comment, setComment] = useState("");
  /*
  const postComment = () => {
    const payload = {
      'postId': postID,
      'comment': comment,
    };
    const URL = "http://127.0.0.1:5000/api/createcomment";
    axios
        .post(URL, payload)
        .then((resp) => {
          if (resp["data"]["status"] === "success") {
            navigate("/post");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
*/

  useEffect(() => {
    const URL = "http://127.0.0.1:5000/api/post?postid=" + postID;
    axios
      .get(URL)
      .then((response) => {
        setUserName(response["data"]["user"]["username"]);
        setUserImage(response["data"]["user"]["user_url"]);
        setPostText(response["data"]["post"]["text"]);
        setPostDescription(response["data"]["post"]["description"]);
        //setRecentResults(response["data"]["recentResults"]);
        setAudioUrl(response["data"]["audio"]["sound_url"]);
      })
      .catch((err) => console.log(err));
    generateTopTwoResults(recentResults);
  }, []);

  const generateTopTwoResults = (results) => {
    // Getting top 2 elements (literally a heap problem)
    let lib = require("../Heap Classes.js");
    let topTwo = new lib.MinHeap();
    results.forEach((result) => {
      topTwo.insert(result);
      if (topTwo.size() > 2) topTwo.remove();
    });
    let i = 0;
    let res = [];
    while (i < 2) {
      res.push(topTwo.remove());
      i += 1;
    }
    setTopTwoResults(res);
  };

  return (
    <div>
      <h1 className="post-title">{postDescription}</h1>
      <div class="imageAndMessage">
        <div class="image-cropper">
          <img src={userImage} />
        </div>
        <div className="messageArea">
          <h3>{userName}</h3>
          <p>{postText}</p>
        </div>
        <IconContext.Provider value={{ className: "playBtn" }}>
          <div>
            <FaRegPlayCircle />
          </div>
        </IconContext.Provider>
      </div>

      <div className="comment-area">
        <textarea
          rows="5"
          cols="40"
          name="Comment"
          placeholder="Submit your comment"
          onChange={(event) => setComment(event.target.value)}
        ></textarea>
        <br />
        <button type="button" id="comment" onClick={console.log("hi")}>
          Comment
        </button>
      </div>

      <h2>Top Results</h2>
      {topTwoResults.map((comment) => {
        console.log("toptworesults", topTwoResults);
        if (comment) {
          return (
            <div className="comment-cell">
              <CommentCell
                username={comment["post_id"]["user_id"]["username"]}
                image={comment["post_id"]["user_id"]["image_url"]}
                datePosted={comment["date_posted"]}
                text={comment["text"]}
                commentId={comment["id"]}
                likeCount={comment["like_count"]}
                dislikeCount={comment["dislike_count"]}
              />
            </div>
          );
        }
      })}
      <h2>Recent Results</h2>
      {recentResults.map((comment, idx) => {
        console.log(recentResults);
        return (
          <div className="comment-cell" key={idx}>
            <CommentCell
              username={comment["post_id"]["user_id"]["username"]}
              image={comment["post_id"]["user_id"]["image_url"]}
              datePosted={comment["date_posted"]}
              text={comment["text"]}
              commentId={comment["id"]}
              likeCount={comment["like_count"]}
              dislikeCount={comment["dislike_count"]}
            />
          </div>
        );
      })}
    </div>
  );
}
