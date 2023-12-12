import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
//import { Context } from '../App/App';
import { Context } from '../App/App';
import styled from 'styled-components'
//import { Button } from 'antd';

//const ilink = '/logout' 
const Button = styled.button`
background-color:blue;
color:white;
padding:5px 15px;
`

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
                <Button onClick={logout}>Log out</Button>
                </div>
    </>
)
}