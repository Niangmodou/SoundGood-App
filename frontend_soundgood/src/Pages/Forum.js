import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import PostCell from "../Components/Cell"


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
      })
  }

  render() {
    return (
      <div>
        <header>Forum</header>
        {
          this.state.forumPosts.map((post, idx) => {
            return (
              <div className="post-area" key={idx}>
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
    )
  }
}

export default Forum
