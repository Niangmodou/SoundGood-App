import React, { Component } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import PersonIcon from "../Icons/PersonIcon.png";
import RecordIcon from "../Icons/RecordIcon.png";
import ForumIcon from "../Icons/ForumIcon.png";
import PostCell from "../Components/PostCell.js";
import "../Css/Forum.css";

class Forum extends Component {
  constructor() {
    super();

    this.state = {
      forumPosts: [],
    };
  }

  componentDidMount() {
    console.log("mounted succesffully");
    // Pull all recordings from the backend
    axios
      .get("http://127.0.0.1:5000/api/forum")
      .then((response) => {
        const posts = response["data"]["posts"];

        this.setState({ forumPosts: posts });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
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
        <h1>Forums</h1>

        <div className="forum-area">
          {this.state.forumPosts.map((post, idx) => {
            console.log(post);
            return (
              <div key={idx}>
                <PostCell
                  username={post["user"]["username"]}
                  image={post["image_url"]}
                  datePosted={post["date_posted"]}
                  text={post["description"]}
                  postID={post["id"]}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Forum;
