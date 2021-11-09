import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function ProfilePage() {
  const tracks = [
    {
      name: 'profile1',
      date: '1 day ago',
      song: "You're beautiful",
      likes: 500,
      dislikes: 200,
      comments: 37,
    },
    {
      name: 'profile2',
      date: '2 day ago',
      song: 'I saw your face',
      likes: 400,
      dislikes: 100,
      comments: 27,
    },
    {
      name: 'profile3',
      date: '3 day ago',
      song: 'In a crowded place',
      likes: 300,
      dislikes: 500,
      comments: 17,
    },
  ];
  return (
    <div>
      <header>Addy Hebou</header>
      <div>Picture</div>
      <div className='trophy'>
        <img alt='trophyIcon' />
        <p>13,459</p>
      </div>
      <div className='badges'>
        <div className='badge'>Badge</div>
        <div className='badge'>Badge</div>
      </div>

      <section>
        <div className='header'>
          <h2>Discovered Songs</h2>
          <p>View More</p>
        </div>
        {tracks.map((song) => {
          return (
            <div>
              <p>{song.name}</p>
              <p>{song.song}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
