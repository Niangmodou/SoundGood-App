import React, { Component } from 'react';
import PostCell from '../Components/PostCell';
import axios from 'axios';

class SavedSongs extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem('userToken') === null) return;

    const URL = 'http://127.0.0.1:5000/api/userposts';
    const token = localStorage.getItem('userToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(URL, config)
      .then((response) => {
        console.log(response)
        const posts = response['data']['posts']
        console.log(posts)
        this.setState({ posts: posts });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div>
        <h1>Saved Posts </h1>
        {this.state.posts.map((post, idx) => {
          <div className='post-cell' key={idx}>
            <PostCell
              username={post['user_id']['username']}
              image={post['image_url']}
              datePosted={post['date_posted']}
              text={post['description']}
              postID={post['id']}
            />
          </div>;
        })}
      </div>
    );
  }
}

export default SavedSongs;
