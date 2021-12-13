import { IconContext } from "react-icons";
import React from "react";
import axios from "axios";
import CommentCell from "../Components/CommentCell";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import "../Css/Post.css";

export default function Post() {
  const location = useLocation();
  const postID = location.state;

  const avatarImages = [
    "https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1639355020~hmac=e9247db153a478004fa1ab5d71ac43ce",
    "https://cdn-icons.flaticon.com/png/512/706/premium/706807.png?token=exp=1639355020~hmac=0e2a2ab7bba80a82666a38ee556d170d",
    "https://cdn-icons.flaticon.com/png/512/1785/premium/1785896.png?token=exp=1639355020~hmac=02014f3256055d3793fd78ee8da1da91",
    "https://cdn-icons.flaticon.com/png/512/4134/premium/4134175.png?token=exp=1639355020~hmac=54bfc0d713ab28f6be2b318b9b86cdee",
    "https://cdn-icons-png.flaticon.com/512/924/924874.png",
    "https://cdn-icons.flaticon.com/png/512/805/premium/805387.png?token=exp=1639355020~hmac=3e2f7f667203c38d2fc84617b3d40f63",
    "https://cdn-icons.flaticon.com/png/512/3253/premium/3253366.png?token=exp=1639355020~hmac=51952fcfbdaaf7bf1b5912b34ddca6f2",
    "https://cdn-icons.flaticon.com/png/512/805/premium/805370.png?token=exp=1639355020~hmac=92076295495a4bddefbe3c96597459ed",
    "https://cdn-icons-png.flaticon.com/512/6373/6373499.png",
  ];
  const [userImage, setUserImage] = useState(
    avatarImages[Math.floor(Math.random() * avatarImages.length)]
  );
  const [userName, setUserName] = useState("");
  const [postText, setPostText] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [recentResults, setRecentResults] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [topTwoResults, setTopTwoResults] = useState([]);
  const [comment, setComment] = useState("");

  const postComment = () => {
    const payload = {
      postId: postID,
      comment: comment,
    };
    console.log(payload);
    const URL = "http://127.0.0.1:5000/api/createcomment";
    const token = localStorage.getItem("userToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(URL, payload, config)
      .then((resp) => {
        if (resp["data"]["status"] === "success") {
          console.log("successfuly commented!");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    setRecentResults(recentResults.concat(comment));
  };

  useEffect(() => {
    const URL = "http://127.0.0.1:5000/api/post?postid=" + postID;
    axios
      .get(URL)
      .then((response) => {
        console.log(response);
        setUserName(response["data"]["user"]["username"]);
        const image = response["data"]["user"]["user_url"];
        if (image) setUserImage(image);
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
          {console.log("Image", userImage)}
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
        <button type="button" id="comment" onClick={postComment}>
          Comment
        </button>
      </div>

      <h2>Top Results</h2>
      {topTwoResults.map((comment) => {
        console.log("toptworesults", topTwoResults);
        if (comment) {
          return (
            <div className="comment-cell">
              {/* <CommentCell
                username={comment["post_id"]["user_id"]["username"]}
                image={comment["post_id"]["user_id"]["image_url"]}
                datePosted={comment["date_posted"]}
                text={comment["text"]}
                commentId={comment["id"]}
                likeCount={comment["like_count"]}
                dislikeCount={comment["dislike_count"]}
              /> */}
              {comment}
            </div>
          );
        }
      })}
      <h2>Recent Results</h2>
      {recentResults.map((comment, idx) => {
        console.log(recentResults);
        return (
          <div className="comment-cell" key={idx}>
            {/* <CommentCell
              username={comment["post_id"]["user_id"]["username"]}
              image={comment["post_id"]["user_id"]["image_url"]}
              datePosted={comment["date_posted"]}
              text={comment["text"]}
              commentId={comment["id"]}
              likeCount={comment["like_count"]}
              dislikeCount={comment["dislike_count"]}
            /> */}
            <div className="comment">{comment}</div>
            <CommentCell text={comment} date={new Date()} />
          </div>
        );
      })}
    </div>
  );
}
