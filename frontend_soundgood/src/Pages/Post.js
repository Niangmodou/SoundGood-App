import React from "react";
import axios from "axios";
import CommentCell from "../Components/CommentCell";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Post() {
  const location = useLocation();
  const postID = location.state;

  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [postText, setPostText] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [recentResults, setRecentResults] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");

  /*
  const postComment = () => {
    const payload = {
      'user_id' = ,
      'post_id': this.props.postId,
    }
}
*/

  useEffect(() => {
    const URL = "http://127.0.0.1:5000/api/post?postid=" + postID;
    axios
      .get(URL)
      .then((response) => {
        setUserName(response["userid"]);
        //setUserImage(response["userImage"]);
        setPostText(response["text"]);
        setPostDescription(response["description"]);
        //setRecentResults(response["recentResults"]);
        setAudioUrl(response["audioid"]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h3 className="post-title">{postDescription}</h3>
      <img src={userImage} />
      <div className="messageArea">
        <h3>{userName}</h3>
        <p>{postText}</p>
      </div>

      <div className="comment-area">
        <label>Comment</label> <br />
        <textarea rows="5" cols="40" name="Comment" placeholder="Enter password">
        </textarea>
        <br/>
        <button type="button" id="comment" onClick={console.log("hi")}>
          Comment
        </button>
      </div>

      <h3>Recent Results</h3>
      {recentResults.map((comment, idx) => {
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
