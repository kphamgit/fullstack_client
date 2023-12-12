import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
  console.log("XXXXXXX credential"+JSON.stringify(credentials))
 return fetch('http://localhost:5000/sessions', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}
 
export default function Login({ setToken, setLoggedInname }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await loginUser({
      username,
      password
    });
    //const test = {...token}
    console.log(" in Login.js token test ="+data.token)
    //console.log("in Login.js token = ",token, " username = ",username)
    //token can be: "error: User does not exist" or {error: "Wrong password"}
    //data.token ? setToken(data) : console.log("Login.js token returned UNDEFINED (error)")
    if(!data.token) { 
      console.log("Login.js token returned UNDEFINED (error)")
    }
    else {
      setToken(data);
      setLoggedInname(username)
      sessionStorage.setItem('user', username)
    }
  }
  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};