import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
//import Context from '../App/App.js'
import { useDispatch, useSelector } from "react-redux";
import { setName } from '../../redux/username';
import { setTokenValue } from '../../redux/token';
//import { setRootPath } from '../../redux/rootpath';
import { setUser } from '../../redux/user';

async function loginUser(rootpath, credentials) {

 let url =  `${rootpath}/sessions`
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
  const [showPassword, setShowPassword] = useState(false);
  const rootpath = useSelector((state) => state.rootpath.value)

  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await loginUser(rootpath, {
      username,
      password
    });
    
    if(!data.token) { 
      console.log("Login.js token returned UNDEFINED (error)")
    }
    else {
      dispatch(setTokenValue(data.token));
      dispatch(setName(username))
      dispatch(setUser(data.user))
      sessionStorage.setItem('user', username)
    }
  }
  return(
    <div className="login-wrapper">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input 
          type={
            showPassword ? "text" : "password"
          }
          onChange={e => setPassword(e.target.value)} />
        </label>
        <label for="check">&nbsp;Show Password&nbsp;</label>
                <input
                    id="check"
                    type="checkbox"
                    value={showPassword}
                    onChange={() =>
                        setShowPassword((prev) => !prev)
                    }
                />
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