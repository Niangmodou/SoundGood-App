import React, {useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router';

const Register = () => {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const registerUser = () => {
    const payload = {
      "first_name": firstName,
      "last_name": lastName,
      "email_address": email,
      "password": password,
      "username": username
    }

    const URL = "http://127.0.0.1:5000/api/register"

    axios.post(URL, payload)
      .then(response => {

        if (response["data"]["status"] === "Succesfully created user") {
          const token = response["data"]["token"]
          localStorage.setItem("userToken", token) 
          navigate("/home")
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <div>
      <h1 onClick={() => navigate("/")}>SoundGood</h1>

        <div>
        <label >Username</label>
          <input
            type='text'
            onChange={e => setUsername(e.target.value)}
            placeholder='Username'
          /> <br/>

          <label >First Name</label>
          <input
            type='text'
            onChange={e => setFirstName(e.target.value)}
            placeholder='First Name'
          /> <br/>

          <label>Last Name</label>
          <input
            type='text'
            onChange={e => setLastName(e.target.value)}
            placeholder='Last Name'
          /> <br/>

          <label>Email</label>
          <input
            type='email'
            onChange={e => setEmail(e.target.value)}
            placeholder='Email'
          /> <br/>

          <label>Password</label>
          <input
            type='password'
            onChange={e => setPassword(e.target.value)}
            placeholder='Enter password'
          />
        </div>

        <div>
    
            <button type='button' id='register' onClick={registerUser}>
              Register
            </button>

          <p>Have an account?  <a href='/login'>Login Instead</a>  </p>

        </div>
    </div>
  );
}

export default Register