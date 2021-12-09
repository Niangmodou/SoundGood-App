import React, { Component } from 'react'
import axios from 'axios'
import PostCell from '../Components/PostCell.js'
import '../Css/Forum.css'

class Forum extends Component {
  constructor() {
    super();

    this.state = {
      forumPosts: [],
    };
  }

  componentDidMount() {
    console.log('mounted succesffully');
    // Pull all recordings from the backend
    axios
      .get('http://127.0.0.1:5000/api/forum')
      .then((response) => {
        console.log(response);
        const posts = response['data']['posts'];
        console.log(posts);

        this.setState({ forumPosts: posts });
        console.log(this.state.forumPosts);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Forums</h1>
 
        <div className='forum-area'>
          {this.state.forumPosts.map((post, idx) => {
            console.log(post);
            return (
              <div key={idx}>
                <PostCell
                  username={post['user']['username']}
                  image={post['image_url']}
                  datePosted={post['date_posted']}
                  text={post['description']}
                  postID={post['id']}
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
