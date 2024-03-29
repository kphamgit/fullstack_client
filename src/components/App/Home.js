import React from "react";
import { useEffect, useState } from "react";
//import {RecordView} from './RecordView'
import RecordView from './RecordView.js'
//import ChatContainer from "./ChatContainer.js";
//import ChatHome from "./ChatHome.js";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch } from "react-redux";
import { clear } from  '../../redux/subcategory.js';
import io from "socket.io-client";
import styled from 'styled-components'
import LiveQuestionAttempt from "./LiveQuestionAttempt.js";
//import EmitQuizQuestionTeacher from "./EmitQuizQuestion.js"
//import EmitLiveQuestionTeacher from "./EmitLiveQuestion.js";
import EmitQuestion from "./EmitQuestion.js"
import { useSelector } from "react-redux";
import RecordViewTeacher from "./RecordViewTeacher.js";
import LiveScoreBoard from "./LiveScoreBoard.js";
import HomeTeacher from "./HomeTeacher.js";
import HomeStudent from "./HomeStudent.js";

import styles from "./ChatPage.module.css";

//import Button from "react-bootstrap/Button"

//import { useSelector } from "react-redux";

//const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';
//the following code DOES NOT make a connection. It just prevents
//an immediate connection
const socket = io.connect(URL, {
   autoConnect: false
});

  const Button = styled.button`
background-color:blue;
color:white;
padding:5px 15px;
`
export const SocketContext = React.createContext();

export default function Home() {
  const user = useSelector((state) => state.user.value)
  //const [showRecordView, setShowRecordView] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clear())
  })

  useEffect(() => {
    // no-op if the socket is already connected
    //console.log(" ChatPage connecting to server")
    socket.connect();
    /* comment this out so that when the Home component dismounts, i.e, user
        go to another link, socket won't get disconnected.
        Leave to code here just for reference/learning
    return () => {
      socket.disconnect();
    };
    */
},[]);

  return (
    <>
    <SocketContext.Provider value={socket}>
    <Container style ={ { backgroundColor: 'orange'} }>
      <Row>
        <Col>
        { user.role === 'teacher' ?
        <HomeTeacher />
        :
        <HomeStudent />
        }
        </Col>
      </Row>
    </Container>
    </SocketContext.Provider>
      
      </>
  );
}
