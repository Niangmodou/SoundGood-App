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
  const [isSignedIn, setIsSignedIn] = useState(true);

  // onSignIn(googleUser){}
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }

  return (
    <div className='App' style={{ backgroundImage: `url(${Background})` }}>
      {isSignedIn ? (
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
