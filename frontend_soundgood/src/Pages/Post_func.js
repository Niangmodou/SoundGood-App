import React from 'react';
import React, { Component } from 'react';
import axios from 'axios';
import CommentCell from '../Components/CommentCell';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Post_func() {
    const location = useLocation();
    const postID = location.state,

    const [userImage, setUserImage] = useState('')
    const [postText, setPostText] = useState('')
    const [postDescription, setPostDescription] = useState('')
    const [recentResults, setRecentResults] = useState('')
    const [audioUrl, setAudioUrl] = useState('')

    useEffect(() => {
        const URL = 'http://127.0.0.1:5000/api/forum?postid=' + this.props.postId;
    axios
      .get(URL)
      .then((response) => {
          setUserName(userName)
          setUserImage(userImage)
          setPostText(postText)
          setPostDescription(postDescription)
          setRecentResults(recentResults)
          setAudioUrl(audio)
          
          this.setState({
              username: response['data']['user_id']['username'],
              userImage: response['data']['user_id']['image_url'],
              postText: response['data']['text'],
              postDescription: response['data']['description'],
              recentResults = response['data']['recentResults'],
          audioUrl: response['data']['audio_id']['sound_url'],
        });
      })
      .catch((err) => console.log(err));
    }, [])


  return <div></div>;
}
