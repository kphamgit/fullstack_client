import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import QuestionAttempt from './QuestionAttempt.js'
import QuestionResponse from "./QuestionResponse.js";
import SubmitButton from "./SubmitButton.js";
import NextButton from "./NextButton.js";
import { useSelector, useDispatch } from "react-redux";
import { setQuestion } from "../../redux/question.js";
import {setId} from "../../redux/question_att_id.js"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setEndOfQuiz } from '../../redux/endofquiz'


export default function QuizAttempt(props) {

  
  const rootpath = useSelector((state) => state.rootpath.value)
    const question_attempt_response = useSelector((state) => state.question_attempt_reponse.value)
   
    const question = useSelector((state) => state.question.value)
    const question_attempt_id = useSelector((state) => state.question_attempt_id.value)
    
    const [quizattemptid, setQuizattemptid] = useState('')
    const [showquestionattempt, setShowquestionattempt] = useState(true)

    const dispatch = useDispatch()

    const location = useLocation()
    const parts = location.pathname.split('/')
    const quizid = parts[parts.length-1]
    
    const user = sessionStorage.getItem('user')

    const end_of_quiz = useSelector((state) => state.endofquiz.value)
    console.log(" quiz attempt end of quiz"+end_of_quiz)
    
    const url = rootpath + "/api/quiz_attempts/find_create/" + quizid + '/' + user
    
    useEffect(() => {
        //console.log(" 3) in QuizAttempt useEffect.********************** About to call axios")
        axios.get(url).then((response) => {
          console.log('  QuizAtt in useEffect after calling axios response data=',response.data)
          dispatch(setEndOfQuiz(false))
          dispatch(setQuestion(response.data.question))
          dispatch(setId(response.data.question_attempt_id))
          
          setQuizattemptid(response.data.quiz_attempt_id)
 
        });
      },[url, dispatch]);

    const childToParent = (childdata) => {
      setShowquestionattempt(childdata);
    }
 
    return(
        <>
     
        <Container>
      <Row>
        <Col xs={10}>
        {showquestionattempt ? <QuestionAttempt format={question.format}/> : <QuestionResponse response_content={question_attempt_response}/>}
        {showquestionattempt ? (
            <SubmitButton quiz_attempt_id={quizattemptid} question_attempt_id={question_attempt_id} question_format={question.format} childToParent={childToParent}/> 
            )
            : ( 
              end_of_quiz ? <div>END OF QUIZ</div> : <NextButton quiz_attempt_id={quizattemptid} next_question_number={question.question_number +1} childToParent ={childToParent}  />
            )
        }
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
       </>
    )
}

