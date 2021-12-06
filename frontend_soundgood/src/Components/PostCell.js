import React from 'react';
import PlayIcon from '../Icons/RecordIcon.png';
import Post from '../Pages/Post.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Function to retrieve a text representation of time passed
const retrieveTime = (datePosted) => {
  console.log(datePosted);
};

// Function to redirect to the post that was clicked on

const PostCell = ({ username, image, datePosted, description, postID }) => {
  const [postId, setPostId] = useState('');
  useEffect(() => {
    setPostId(postId);
  }, []);

  const redirectToPost = () => {
    setPostId(postId);
    return <Post postId={postID} />;
  };

  return (
    <Link to='/post' state={postID}>
      <div className='post-cell'>
        <h3 className='post-name-area'>{username}</h3>
        <p className='post-description'>{description}</p>
        <h3 className='post-time'>{retrieveTime(datePosted)}</h3>
        <img className='post-image' src={image} />
        <img className='post-play-btn' src={PlayIcon} />
      </div>
    </Link>
  );
};

export default PostCell;
