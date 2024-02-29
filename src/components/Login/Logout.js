import React, {useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
//import { Context } from '../App/App';
//import { Context } from '../App/App';
import styled from 'styled-components'
import { setTokenValue } from '../../redux/token';
import { useDispatch, useSelector } from 'react-redux';
//import Button from 'react-bootstrap/Button'
//import "bootstrap/dist/css/bootstrap.min.css"
import { SocketContext } from '../App/Home';

//const ilink = '/logout' 

/*
const Button = styled.button`
background-color:blue;
color:white;
padding:5px 15px;
`
*/



export default function Logout () {
    const socket = useContext(SocketContext);
    const rootpath = useSelector((state) => state.rootpath.value)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            socket.disconnect();
          };
        //socket.disconnect();
    },[])

    async function logout() {
        //console.log("in logout")
       
        dispatch(setTokenValue(''))
        fetch(`${rootpath}/logout`)
        navigate('/')
      }

    const navigate = useNavigate()
    logout()

return (
    <>
                <div>
               
                </div>
    </>
)
}