import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import PostCell from "../Components/PostCell.js"


class Forum extends Component {
  constructor() {
    super()

    this.state = {
      forumPosts: []
    }
  }

  componentDidMount() {
    // Pull all recordings from the backend
    axios.get("http://127.0.0.1:5000/api/forum")
      .then((response) => {
        const posts = response["data"]["posts"]

        this.setState({forumPosts: posts})
      }).catch((err) => {
        console.error(err)
      })
  }

  render() {
    return (
      <div>
        <h1>Forum</h1>
        <div className="forum-area">
          {
            this.state.forumPosts.map((post, idx) => {
              return (
                <div className="post-cell" key={idx}>
                  <PostCell
                    username = {post["user_id"]["username"]}
                    image = {post["image_url"]}
                    datePosted = {post["date_posted"]}
                    text = {post["description"]}
                    postID = {post["id"]}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Forum
