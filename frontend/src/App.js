import logo from './logo.svg';
import React, { useState, Component } from 'react';
import './App.css';
import RedBackgroundOverlay from './Icons/RedBackgroundOverlay.png';
// import { BsFillPersonFill as PersonIcon } from 'react-icons/BsFillPersonFill';
// clientID: 626147039911-9ume6m1jbb1k022bmmppqk7gapkhk6aa.apps.googleusercontent.com
// client Secret: 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
import Background from './Images/Background.png';
import LandingPage from './Pages/LandingPage';

export default function App() {
  // const [isSignedIn, setIsSignedIn] = useState(true);
  return (
    <div className='App' style={{ backgroundImage: `url(${Background})` }}>
      {true ? (
        <LandingPage />
      ) : (
        <header className='App-header'>
          <h2>SoundGood</h2>
          <div class='g-signin2' data-onsuccess='onSignIn'></div>
        </header>
      )}
    </div>
  );
}
