import React from 'react';

export default function Login() {
  return (
    <div>
      <a class='nav-link' href='/login'>
        <button type='button' id='Login'>
          Login
        </button>
      </a>
      <a class='nav-link' href='/register'>
        <button type='button' id='Register'>
          Register
        </button>
      </a>
      <form action='/login_auth' method='POST'>
        <div>
          <label class='form-label'>Username</label>
          <input
            type='text'
            placeholder='Username'
          /> <br/>
  
          <label class='form-label'>Password</label>
          <input
            type='password'
            placeholder='Enter password'
          />
        </div>

        <div class='text-center text-lg-start mt-4 pt-2'>
          <button type='submit' value='log'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
