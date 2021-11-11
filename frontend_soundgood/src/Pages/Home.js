import React from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from '../Icons/PersonIcon.png';
import RecordIcon from '../Icons/RecordIcon.png';
import ForumIcon from '../Icons/ForumIcon.png';
import RecordButton from '../Icons/RecordButton.png';

export default function Home() {
  return (
    <div>
      <header className='navbar'>
        <Link to='/profile'>
          <img src={PersonIcon} />
        </Link>
        <Link to='/savedsongs'>
          <img src={RecordIcon} />
        </Link>
        <Link to='/forum'>
          <img src={ForumIcon} />
        </Link>
      </header>
      <main>
        <div>
          <h1>Tap to Record</h1>
          <img src={RecordButton} />
        </div>
      </main>
    </div>
  );
}
