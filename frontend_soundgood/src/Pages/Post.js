import { IconContext } from "react-icons";
import React from "react";
import axios from "axios";
import PersonIcon from "../Icons/PersonIcon.png";
import RecordIcon from "../Icons/RecordIcon.png";
import ForumIcon from "../Icons/ForumIcon.png";
import CommentCell from "../Components/CommentCell";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import "../Css/Post.css";

export default function Post() {
  const location = useLocation();
  const postID = location.state;
/*
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
 */
  const [userImage, setUserImage] = useState("");
  
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
    //console.log(payload);
    const URL = "https://tandon-soundgood.herokuapp.com/api/createcomment";
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
  };

  const playSound = () => {
    //console.log(audioUrl);
    const player = new Audio(audioUrl);
    player.play();
  };

  useEffect(async () => {
    const URL = "https://tandon-soundgood.herokuapp.com/api/post?postid=" + postID;
    axios
      .get(URL)
      .then((response) => {
        //console.log(response);
        setUserName(response["data"]["user"]["username"]);
        setUserImage(response["data"]["user"]["image_url"]);
        setPostText(response["data"]["post"]["text"]);
        setPostDescription(response["data"]["post"]["description"]);
        setRecentResults(response["data"]["recentResults"]);
        setAudioUrl(response["data"]["audio"]["sound_url"]);
        generateTopTwoResults(response["data"]["recentResults"]);
      })
      .catch((err) => console.log(err));
  }, []);

  const generateTopTwoResults = (results) => {
    // Getting top 2 elements (literally a heap problem)
    let lib = require("../Heap Classes.js");
    //console.log("RECENT RESULTS: ", recentResults);
    let topTwo = new lib.MinHeap();
    results.forEach((result) => {
      //console.log(result);
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
      <div>
        <header className="navbar">
          <Link to="/profile">
            <img src={PersonIcon} />
          </Link>
          <Link to="/savedsongs">
            <img src={RecordIcon} />
          </Link>
          <Link to="/forum">
            <img src={ForumIcon} />
          </Link>
        </header>
      </div>
      <h1 className="post-title">{postDescription}</h1>
      <div class="imageAndMessage">
        <div class="image-cropper">
          {/*console.log("Image", userImage)*/}
          <img src={userImage} />
        </div>
        <div className="messageArea">
          <h3>{userName}</h3>
          <p>{postText}</p>
        </div>
        <IconContext.Provider value={{ className: "playBtn" }}>
          <div>
            <FaRegPlayCircle onClick={playSound} />
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
      <div className="comment-section">
        {topTwoResults.map((currComment, idx) => {
          if (currComment) {
            return (
              <div className="comment-cell" key={idx}>
                <CommentCell
                  username={currComment["user"]["username"]}
                  image={currComment["user"]["image_url"]}
                  datePosted={currComment["date_posted"]}
                  text={currComment["text"]}
                  commentId={currComment["id"]}
                  likeCount={currComment["like_count"]}
                  dislikeCount={currComment["dislike_count"]}
                />
              </div>
            );
          }
        })}
      </div>

      <h2>Recent Results</h2>
      <div className="comment-section">
        {recentResults.map((currComment, idx) => {
          return (
            <div className="comment-cell" key={idx}>
              <CommentCell
                username={currComment["user"]["username"]}
                image={currComment["user"]["image_url"]}
                datePosted={currComment["date_posted"]}
                text={currComment["text"]}
                commentId={currComment["id"]}
                likeCount={currComment["like_count"]}
                dislikeCount={currComment["dislike_count"]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
