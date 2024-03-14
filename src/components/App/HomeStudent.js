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
//import io from "socket.io-client";
import ChatPage from "./ChatPage.js";
import styled from 'styled-components'
import LiveQuestionAttempt from "./LiveQuestionAttempt.js";
//import EmitQuizQuestionTeacher from "./EmitQuizQuestion.js"
//import EmitLiveQuestionTeacher from "./EmitLiveQuestion.js";
//import EmitQuestion from "./EmitQuestion.js"
import { useSelector } from "react-redux";
//import RecordViewTeacher from "./RecordViewTeacher.js";
import LiveScoreBoard from "./LiveScoreBoard.js";
import { SocketContext } from "./Home.js";
import SpeechSynthesis from "./SpeechSynthesis.js"
import MatchGame from "./MatchGame.js";

import styles from "./ChatPage.module.css";
//import TextToCanvas from "./TextToCanvas.js";
import MatchGameText from "./MatchGame.js";

//import Button from "react-bootstrap/Button"

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';

  const Button = styled.button`
background-color:blue;
color:white;
padding:5px 15px;
`
  //export const SocketContext = React.createContext();

export default function HomeStudent() {
  //const rootpath = useSelector((state) => state.rootpath.value)
  //const [studentGroup, setStudentGroup] = useState('')
  //const username = useSelector((state) => state.username.value)
  const user = useSelector((state) => state.user.value)
  const socket = useContext(SocketContext);
  const [showRecordView, setShowRecordView] = useState(false)
  const [showMatchGame, setShowMatchGame] = useState(false)
  const [livequiz, setLiveQuiz] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [gameId, setGameId] = useState(null)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clear())
  })

  useEffect(() => {
    //register "socket.on" event upon component mount
    //or when one of the dependencies changes value
    socket.on('enable_game', (arg) => {
        //console.log("enabl game arg=",arg)
        setGameId(arg.game_id)
        setLiveQuiz(false)
        setShowMatchGame(true)
        setShowMessage(false)
    })
    socket.on('enable_live_quiz', () => {
      //console.log("show match game")
      setLiveQuiz(true)
      setShowMatchGame(false)
      setShowMessage(false)
  })
  },[socket])
  
  const toggleRecord = () => {
    setShowRecordView(!showRecordView)
  }
  const toggleTeacherMessage = () => {
    setShowMessage(!showMessage)
  }

  return (
    <>
    <SocketContext.Provider value={socket}>
    <Container style ={ { backgroundColor: '#f2caa7'} }>
      <Row style ={ { backgroundColor: 'red', height:"70vh" }}>
        <Col style ={ { backgroundColor: '#f2caa7' }} xs={9}>
          <Row>
          {showMessage && <div  dangerouslySetInnerHTML={{ __html: user.teacher_message }}></div>}
          {showMatchGame && <MatchGame gameId={gameId} />}
          </Row>
          { livequiz && <>
          <Row style={{height:"75%"}}>
             <LiveQuestionAttempt />
          </Row>
          <Row style={{height: "25%", backgroundColor: "lightgray"}}>
            <LiveScoreBoard class_id = {user.class_id} /> 
          </Row>
          </>
          }
          <button onClick={toggleRecord}>Show Record</button>
          <button onClick={toggleTeacherMessage}>Show Teacher's Message</button>
          {showRecordView && <>
          <Row style ={ { backgroundColor: 'green', height:"30vh" } } >
          <RecordView />
         </Row>
          </> }
        </Col>
        <Col style={{ height: "70vh", backgroundColor: "#e0b8c3"}} xs={3}>
              <ChatPage />
        </Col>
      </Row>
      
    </Container>
    </SocketContext.Provider>
      
      </>
  );
}
