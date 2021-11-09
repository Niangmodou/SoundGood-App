import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PersonIcon from '../Icons/PersonIcon.png';
import RecordIcon from '../Icons/RecordIcon.png';
import ForumIcon from '../Icons/ForumIcon.png';
import RecordButton from '../Icons/RecordButton.png';

export default function Home() {
  return (
    <div>
      <header>
        <div className='navbar'>
          {/* <Link to='/profile'> */}
          <img src={PersonIcon} />
          {/* </Link> */}
          <img src={RecordIcon} />
          <img src={ForumIcon} />
        </div>
      </header>
      <main>
        <h1>Tap to Record</h1>
        <img src={RecordButton} />
      </main>
    </div>
  );
}
