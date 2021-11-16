import React, {useState} from 'react';
import axios from 'axios'

const Login = () => {
  var error = ''

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = () => {
    const payload = {
      "username": username,
      "password": password
    }

    const URL = "http://127.0.0.1:5000/api/login"

    axios.post(URL, payload)
    .then(response => {
      const status = response["data"]["status"]
      
      if (status.trim() === "Succesfully logged in user") {
        const token = response["data"]["token"]
        localStorage.setItem("userToken", token)
      }
    }).catch(err => {
      console.log(err)
    })

  }

  return (
    <div>
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

  
        <div>
          <label>Username</label>
          <input
            type='text'
            placeholder='Username'
            onChange={event => setUsername(event.target.value)}
          /> <br/>
  
          <label>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            onChange={event => setPassword(event.target.value)}
          />
        </div>

        <div>
          <button type='submit' value='login' onClick={loginUser}>
            Login
          </button>
        </div>
    </div>
  );
}

export default Login