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
import { clear } from  '../../redux/subcategory';
import io from "socket.io-client";
import ChatPage from "./ChatPage.js";
import styled from 'styled-components'
import LiveQuestionAttempt from "./LiveQuestionAttempt.js";
import LiveQuestionAttemptTeacher from "./LiveQuestionAttemptTeacher.js";
import { useSelector } from "react-redux";
import RecordViewTeacher from "./RecordViewTeacher.js";
//import Button from "react-bootstrap/Button"

//import { useSelector } from "react-redux";

//const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';
//console.log("URRRRRRRRRRRRRL "+URL)
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
  //const rootpath = useSelector((state) => state.rootpath.value)
  //const [studentGroup, setStudentGroup] = useState('')
  //const username = useSelector((state) => state.username.value)
  const user = useSelector((state) => state.user.value)

  const [showRecordView, setShowRecordView] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clear())
  })


    useEffect(() => {
        // no-op if the socket is already connected
        //console.log(" ChatPage connecting to server")
        socket.connect();
        /*
        return () => {
          socket.disconnect();
        };
        */
    },[]);
    
    function toggleRecordView() {
      //console.log("HERE")
      setShowRecordView(true)
    }

  return (
    <>
    <SocketContext.Provider value={socket}>
    <Container style ={ { backgroundColor: 'brown'} }>
      <Row>
        <Col style ={ {height: "70vh", backgroundColor: '#e6d3c3' }} xs={9}>
        { user.role === 'teacher' ?
        <LiveQuestionAttemptTeacher  />
        :
        <LiveQuestionAttempt  />
        }
        </Col>
        <Col style={{ height: "70vh", backgroundColor: "#e0b8c3"}} xs={3}>
              <ChatPage />
        </Col>
      </Row>
        <Row>
          { user.role === 'teacher' ? 
           <RecordViewTeacher />
           :
           <div>
           <Button  onClick={() => toggleRecordView()}>Show Record</Button>
           </div>
          }
        </Row>
        <Row>
        { showRecordView &&
           <RecordView />
        }
        </Row>
    </Container>
    </SocketContext.Provider>
      
      </>
  );
}
