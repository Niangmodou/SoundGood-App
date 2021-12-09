import React from 'react';
import PlayIcon from '../Icons/RecordIcon.png';
import Post from '../Pages/Post.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Css/PostCell.css';
import { FaRegPlayCircle } from 'react-icons/fa';

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

  console.log(text);

  return (
    <Link to='/post' state={postID}>
      <div className='post-cell'>
        <div className='topLevel'>
          <div>
            <h3 className='post-name-area'>{username}</h3>
            <p className='post-description'>{text}</p>
          </div>
          <h3 className='post-time'>{retrieveTime(datePosted)}4h</h3>
        </div>
        {/* <img className='post-play-btn' src={PlayIcon} /> */}
        <div className='bottomLevel'>
          <img className='post-image' src={image} />
          <div>Picture</div>
          <FaRegPlayCircle />
        </div>
      </div>
    </Link>
  );
};

export default PostCell;
