import React from "react";
import { useEffect, useState, useContext } from "react";
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
import ChatPage from "./ChatPage.js";
import styled from 'styled-components'
import LiveQuestionAttempt from "./LiveQuestionAttempt.js";
//import EmitQuizQuestionTeacher from "./EmitQuizQuestion.js"
//import EmitLiveQuestionTeacher from "./EmitLiveQuestion.js";
import EmitQuestion from "./EmitQuestion.js"
import { useSelector } from "react-redux";
import RecordViewTeacher from "./RecordViewTeacher.js";
//import LiveScoreBoard from "./LiveScoreBoard.js";
import { SocketContext } from './Home';


import styles from "./ChatPage.module.css";

//import Button from "react-bootstrap/Button"

//import { useSelector } from "react-redux";

//const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';
//console.log("URRRRRRRRRRRRRL "+URL)
//const socket = io.connect(URL, {
 ////   autoConnect: false
 // });

  const Button = styled.button`
background-color:blue;
color:white;
padding:5px 15px;
`
  //export const SocketContext = React.createContext();

export default function HomeTeacher() {
  
  const user = useSelector((state) => state.user.value)
  const socket = useContext(SocketContext);
  const [showRecordView, setShowRecordView] = useState(false)
  const [gameId, setGameId] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clear())
  })

    function toggleRecordView() {
      //console.log("HERE")
      setShowRecordView(true)
    }

    const enableGame = () => {
      socket.emit("enable_game", {game_id: gameId})
    }

    const enableLiveQuiz = () => {
      socket.emit("enable_live_quiz")
    }

  return (
    <>
   
    <Container style ={ { backgroundColor: 'brown'} }>
      <Row>
        <Col style ={ {height: "70vh", backgroundColor: 'green' }} xs={9}>
        <EmitQuestion />
        <button onClick={enableGame}>Enable Game</button>
        <input type="text" placeholder="game id" onChange={e => setGameId(e.target.value)} />
        <button onClick={enableLiveQuiz}>Enable Live Quiz</button>
        </Col>
        <Col style ={ {height: "70vh", backgroundColor: 'orange' }} >
        <ChatPage />
        </Col>
      </Row>
        <Row>
           <RecordViewTeacher />
        </Row>
    </Container>
      </>
  );
}
