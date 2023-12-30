import React from "react";
import { useEffect } from "react";
import MicRecorder from 'mic-recorder-to-mp3';
//import {RecordView} from './RecordView'
import RecordView from './RecordView.js'
//import ChatContainer from "./ChatContainer.js";
import ChatHome from "./ChatHome.js";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch } from "react-redux";
import { clear } from  '../../redux/subcategory';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const styles={
  body: {
    margin:0,
    padding:0
  },
}



export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clear())
  })
  return (
    <>
      <Container style ={ { backgroundColor: 'yellow'} }>
        <Row>HOME</Row>
      <Row>
        <Col style={{backgroundColor: "red"}} xs={10}>Col1</Col>
        <Col style={{backgroundColor: "green"}} xs={2}>col 2<ChatHome /></Col>
      </Row>
      <Row><RecordView /></Row>
    </Container>
      </>
  );
}
