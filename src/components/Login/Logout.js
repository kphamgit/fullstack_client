import React from 'react';
import { useNavigate } from 'react-router-dom';
//import { Context } from '../App/App';
//import { Context } from '../App/App';
import styled from 'styled-components'
import { setTokenValue } from '../../redux/token';
import { useDispatch } from 'react-redux';

//const ilink = '/logout' 
const Button = styled.button`
background-color:blue;
color:white;
padding:5px 15px;
`

export default function Logout () {
    const dispatch = useDispatch()
    async function logout() {
        console.log("in logout")
        dispatch(setTokenValue(''))
        fetch('http://localhost:5000/logout')
        navigate('/')
      }

    const navigate = useNavigate()

return (
    <>
                <div>
                <Button onClick={logout}>Log out</Button>
                </div>
    </>
)
}