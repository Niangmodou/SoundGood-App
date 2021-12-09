import React, { Component } from 'react';
import axios from 'axios';
import CommentCell from '../Components/CommentCell';

class Post extends Component {
  constructor(props) {
    // const location = useLocation();
    super(props);

    this.state = {
      username: '',
      userImage: '',
      postText: '',
      postComment: '',
      audioUrl: '',
      postDescription: '',

      recentResults: [],
      //   postID: location.state,
    };
  }

  componentDidMount() {
    const URL = 'http://127.0.0.1:5000/api/forum?postid=' + this.props.postId;
    axios
      .get(URL)
      .then((response) => {
        let recentResults = response['data']['recentResults'];

        this.setState({
          username: response['data']['user_id']['username'],
          userImage: response['data']['user_id']['image_url'],
          postText: response['data']['text'],
          postDescription: response['data']['description'],
          recentResults: recentResults,
          audioUrl: response['data']['audio_id']['sound_url'],
        });
      })
      .catch((err) => console.log(err));
  }

  isUserLoggedIn = () => {
    return localStorage.getItem('userToken') !== null;
  };

  // Method to retrieve a text representation of time passed
  retrieveTime = (datePosted) => {};

  render() {
    return (
      <div>
        <h3 className='post-title'>{this.state.postDescription}</h3>

        <img src={this.state.userImage} />

        <div className='messageArea'>
          <h3>{this.state.username}</h3>
          <p>{this.state.postText}</p>
        </div>

        <h3>Recent Results</h3>
        {this.state.recentResults.map((comment, idx) => {
          return (
            <div className='comment-cell' key={idx}>
              <CommentCell
                username={comment['post_id']['user_id']['username']}
                image={comment['post_id']['user_id']['image_url']}
                datePosted={comment['date_posted']}
                text={comment['text']}
                commentId={comment['id']}
                likeCount={comment['like_count']}
                dislikeCount={comment['dislike_count']}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Post;
