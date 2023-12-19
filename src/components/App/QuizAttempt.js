import React from "react";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from './App.js'
import QuestionAttempt from './QuestionAttempt.js'
import QuestionResponse from "./QuestionResponse.js";
import SubmitButton from "./SubmitButton.js";
import NextButton from "./NextButton.js";
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../../redux/question.js";
import {setId} from "../../redux/question_att_id.js"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function QuizAttempt(props) {

  const rootpath = useSelector((state) => state.rootpath.value)
    const question_attempt_response = useSelector((state) => state.question_attempt_reponse.value)
    //const [question, setQuestion] = useState({})
    //const {question} = useSelector(question)
    const question = useSelector((state) => state.question.value)
    const question_attempt_id = useSelector((state) => state.question_attempt_id.value)
    
    //console.log("XXXXXXXXXXXXXXXXx",question)
    //const [question_attempt_id, setQuestionattemptid] = useState(0)
    const [quizattemptid, setQuizattemptid] = useState('')
    const [showquestionattempt, setShowquestionattempt] = useState(true)

    //const {loggedinname, setLoggedinname}  = useContext(Context);
    //console.log(" in Quiz attempt loggedinName ="+loggedinname) 

    const dispatch = useDispatch()

    const location = useLocation()
    const parts = location.pathname.split('/')
    const quizid = parts[parts.length-1]
    
    const user = sessionStorage.getItem('user')
    
    const url = rootpath + "/api/quiz_attempts/find_create/" + quizid + '/' + user
    
    useEffect(() => {
        //console.log(" 3) in QuizAtt useEffect. About to call axios")
        axios.get(url).then((response) => {
          console.log('  QuizAtt in useEffect response data=',response.data)
          //setPost(response.data);
          //setQuestion(response.data.question)
          dispatch(setValue(response.data.question))
          dispatch(setId(response.data.question_attempt_id))
          //setQuestionattemptid(response.data.question_attempt_id)
          setQuizattemptid(response.data.quiz_attempt_id)
          //setQuestionformat(response.data.question_format)
          //console.log("5) in QuizAtt response data = ", response.data)
        });
      }, [url]);

    //const setMyQuestion = (childdata) => {
     // setQuestion(childdata)
    //}
    //const updatequestionattempt = (childdata) => {
     // setQuestionattempt(childdata)
    //}
    const childToParent = (childdata) => {
      setShowquestionattempt(childdata);
    }
    console.log("HEEEEEEEEEEEEEEEEEEE")
    console.log(question)
    return(
        <>
        <Container>
      <Row>
        
        <Col xs={10}>2 of 3 (wider)
        {showquestionattempt ? <QuestionAttempt format={question.format}/> : <QuestionResponse response_content={question_attempt_response}/>}
        {showquestionattempt ? <SubmitButton question_attempt_id={question_attempt_id} question_format={question.format} childToParent={childToParent}/> : <NextButton quiz_attempt_id={quizattemptid} question_id={question.id} childToParent ={childToParent}  />}

        </Col>
        <Col xs={2}>3 of 3</Col>
      </Row>
    </Container>
       </>
    )
}

