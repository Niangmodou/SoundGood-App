import React from 'react'
import PlayIcon from "../Icons/RecordIcon.png"

// Function to retrieve a text representation of time passed
const retrieveTime = (datePosted) => {
}

const PostCell = ({username, image, datePosted, text, postID}) => {
    return (
        <div className="post-cell">
            <h3 className="post-name-area">{username}</h3>
            <p className="post-comment">{text}</p>
            <h3 className="post-time">{retrieveTime(datePosted)}</h3>
            <img className="post-image" src={image} />
            <img className="post-play-btn" src={PlayIcon} />
        </div>
    )
}

export default PostCell