import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Link,
} from 'react-router-dom';
import ProfilePage from './ProfilePage';
import Home from './Home';
import PersonIcon from '../Icons/PersonIcon.png';
import RecordIcon from '../Icons/RecordIcon.png';
import ForumIcon from '../Icons/ForumIcon.png';
import RecordButton from '../Icons/RecordButton.png';

export default function LandingPage() {
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
    // <BrowserRouter>
    //   <Router>
    //     <Routes>
    //       <Route path='/' element={<Home />} />
    //       <Route path='/profile' element={<ProfilePage />} />
    //     </Routes>
    //   </Router>
    // </BrowserRouter>
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
