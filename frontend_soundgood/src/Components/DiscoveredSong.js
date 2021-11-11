import React from 'react';
import { FaThumbsDown, FaThumbsUp, FaComment } from 'react-icons/fa';
import Song from '../Components/Song.js';
import '../Css/DiscoveredSong.css';

export default function DiscoveredSong(props) {
  const song = props.song;
  return (
    <div className='discoveredSong'>
      <div className='discoveredSongText'>
        <p>
          {song.name} - {song.date}
        </p>
        <p>"{song.song}"</p>
        <div className='ratings'>
          <p>
            <FaThumbsUp />
            {song.likes}
          </p>
          <p>
            <FaThumbsDown />
            {song.dislikes}
          </p>
          <p>
            <FaComment />
            {song.comments}
          </p>
        </div>
      </div>
      <Song />
    </div>
  );
}
