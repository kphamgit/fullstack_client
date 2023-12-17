import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
//import Context from '../App/App.js'
import { useDispatch } from "react-redux";
import { setName } from '../../redux/username';
import { setTokenValue } from '../../redux/token';


async function loginUser(credentials) {
  //console.log("XXXXXXX credential"+JSON.stringify(credentials))
  let url
  if (process.env.NODE_ENV === 'development') 
    url = 'http://localhost:5000/sessions'
  else
    url = 'https://fullstack-kp-f6a689f4a15c.herokuapp.com/sessions'

 return fetch(url, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}
 
export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await loginUser({
      username,
      password
    });
    
    console.log(" in Login.js token data =",data)
    if(!data.token) { 
      console.log("Login.js token returned UNDEFINED (error)")
    }
    else {
      dispatch(setTokenValue(data.token));
      dispatch(setName(username))
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

//Login.propTypes = {
 // setToken: PropTypes.func.isRequired
//};