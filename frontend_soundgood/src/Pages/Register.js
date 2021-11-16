import React from 'react';

const Register = () => {
  return (
    <div>
      <a class='nav-link' href='/login'>
        <button class='btn btn-primary' type='button' id='Login'>
          Login
        </button>{' '}
      </a>
      <a class='nav-link' href='/register'>
        <button class='btn btn-primary' type='button' id='Register'>
          Register
        </button>{' '}
      </a>

      <form>
        <div>
        <label class='form-label'>First Name</label>
          <input
            type='text'
            placeholder='First Name'
          /> <br/>

          <label class='form-label'>Last Name</label>
          <input
            type='text'
            placeholder='Last Name'
          /> <br/>

          <label class='form-label'>Email address</label>
          <input
            type='email'
            placeholder='Email'
          /> <br/>

          <label class='form-label'>Password</label>
          <input
            type='password'
            placeholder='Enter password'
          />
        </div>

        <div class='text-center text-lg-start mt-4 pt-2'>
          <button type='button' id='register'>
            Register
          </button>
        </div>

      </form>
    </div>
  );
}

export default Register