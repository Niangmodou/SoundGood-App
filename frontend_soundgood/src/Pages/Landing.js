import React from 'react';

export default function Landing() {
return (
  <div>
    <h1>SoundGood</h1>
    <h3>Welcome to the place that will help you find that song stuck in your head!</h3>
    
    <a href='/login'>
      <button type='button' id='Login'>
        Login
      </button>
    </a>
    <a href='/register'>
      <button type='button' id='Register'>
        Register
      </button>
    </a>
  </div>
   );
  }
  