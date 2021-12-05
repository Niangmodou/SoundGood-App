import React, {Component} from 'react'
import axios from 'axios'

import LikeIcon from '../Icons/LikeIcon.js'
import DislikeIcon from '../Icons/DislikeIcon.js'

const isLoggedIn = () => {
    return localStorage.getItem("userToken") !== null
}

// Function to retrieve a text representation of time passed
const retrieveTime = (datePosted) => {
}

// Function to increment the like of a comment
const incrementLikeCount = (commentId) => {
    if(!isLoggedIn) return 

    // TODO: Send the user token as a bearer token with the Axios request
    const userToken = localStorage.getItem('userToken')

    const URL = `http://127.0.0.1:5000/api/likecomment?commentid=${commentId}`
    axios.post(URL, {"user": userToken})
         .then(response => assert(response["data"]["status"] === "success"))
         .catch(err => console.log(err))
}

// Function to increment the dislike of a comment
const incrementDislikeCount = (commentId) => {
    if(!isLoggedIn) return      

    // TODO: Send the user token as a bearer token with the Axios request
    const URL = `http://127.0.0.1:5000/api/dislikecomment?commentid=${commentId}`
    axios.post(URL, {"user": userToken})
         .then(response => assert(response["data"]["status"] === "success"))
         .catch(err => console.log(err))
}

const CommentCell = ({commentId, username, image, datePosted, text, likeCount, dislikeCount}) => {
    return (
        <div className="comment-cell" key={idx}>
            <h3 className="comment-name">{username}</h3>
            <img className="comment-image" src={image} />
            <h3 className="comment-time">{retrieveTime(datePosted)}</h3>

            <p className="comment">{text}</p>

            <div className="like-area" onClick={incrementLikeCount(commentId)}>
                <img src={LikeIcon}/>
                <p>{likeCount}</p>
            </div>

            <div className="dislike-area" onClick={incrementDislikeCount(commentId)}>
                <img src={DislikeIcon}/>
                <p>{dislikeCount}</p>
            </div>
            
        </div>
    )
}

export default CommentCell