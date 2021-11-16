import React from 'react';

export default function Login() {
  return (
    <div>
      <a class='nav-link' href='/login'>
        <button class='btn btn-primary' type='button' id='Login'>
          Login
        </button>
      </a>
      <a class='nav-link' href='/register'>
        <button class='btn btn-primary' type='button' id='Register'>
          Register
        </button>{' '}
      </a>
      <form action='/login_auth' method='POST'>
        <div class='form-outline mb-4'>
          <input
            type='email'
            class='form-control form-control-lg'
            placeholder='Email'
          />
          <label class='form-label'>Email address</label>
        </div>

        <div class='form-outline mb-3'>
          <input
            type='password'
            class='form-control form-control-lg'
            placeholder='Enter password'
          />
          <label class='form-label'>Password</label>
        </div>

        <div class='text-center text-lg-start mt-4 pt-2'>
          <button type='submit' class='btn btn-primary btn-lg' value='log'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
