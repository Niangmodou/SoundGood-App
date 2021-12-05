import React from 'react'
import PlayIcon from "../Icons/RecordIcon.png"
import Post from "../Components/Post.js"

// Function to retrieve a text representation of time passed
const retrieveTime = (datePosted) => {
    console.log(datePosted)
}

// Function to redirect to the post that was clicked on
const redirectToPost = (postID) => {
    return <Post postId={postID} />
}

const PostCell = ({username, image, datePosted, description, postID}) => {
    return (
        <div className="post-cell" onClick={redirectToPost(postID)}>
            <h3 className="post-name-area">{username}</h3>
            <p className="post-description">{description}</p>
            <h3 className="post-time">{retrieveTime(datePosted)}</h3>
            <img className="post-image" src={image} />
            <img className="post-play-btn" src={PlayIcon} />
        </div>
    )
}

export default PostCell