import React from "react";
import { useEffect } from "react";
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
//import { useSelector } from "react-redux";

//const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';
//console.log("URRRRRRRRRRRRRL "+URL)
const socket = io.connect(URL, {
    autoConnect: false
  });

export default function Home() {
  //const rootpath = useSelector((state) => state.rootpath.value)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clear())
  })
  return (
    <>
      <Container style ={ { backgroundColor: 'blue'} }>
        <Row style ={ { backgroundColor: 'green' }} >HOME</Row>
      <Row>
        <Col style ={ {height: "70vh", backgroundColor: 'brown' }} xs={9}></Col>
        <Col style={{ height: "70vh", backgroundColor: "red"}} xs={3}><ChatPage socket={socket} /></Col>
      </Row>
      <Row><RecordView socket={socket} /></Row>
    </Container>
      </>
  );
}
