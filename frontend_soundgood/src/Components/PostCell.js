import React from 'react';
import PlayIcon from '../Icons/RecordIcon.png';
import Post from '../Pages/Post.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Css/PostCell.css';

// Function to retrieve a text representation of time passed
const retrieveTime = (datePosted) => {
  console.log(datePosted);
};

// Function to redirect to the post that was clicked on

const PostCell = ({ username, image, datePosted, text, postID }) => {
  const [postId, setPostId] = useState('');
  useEffect(() => {
    setPostId(postId);
  }, []);

  const redirectToPost = () => {
    setPostId(postId);
    return <Post postId={postID} />;
  };

  console.log(datePosted);

  return (
    <Link to='/post' state={postID}>
      <div className='post-cell'>
        <img className='post-play-btn' src={PlayIcon} />
        <h3 className='post-name-area'>{username}</h3>
        <p className='post-description'>{text}</p>
        <h3 className='post-time'>{retrieveTime(datePosted)}</h3>
        <img className='post-image' src={image} />
      </div>
    </Link>
  );
};

export default PostCell;
