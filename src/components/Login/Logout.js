import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
//import { Context } from '../App/App';
import { Context } from '../App/App';

//const ilink = '/logout' 
export default function Logout () {

    const { token, setToken } = useContext(Context);

    async function logout() {
        console.log("in logout")
        setToken("")
        //console.log(token)
        fetch('http://localhost:5000/logout')
        navigate('/')
      }

    const navigate = useNavigate()

    //alert("in Logout")
return (
    <>
                <div>
                <button onClick={logout}  style={{color:"blue", cursor:'pointer'}} >Log out</button>
                </div>
    </>
)
}