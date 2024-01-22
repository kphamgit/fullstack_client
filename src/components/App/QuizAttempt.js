import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import QuestionAttempt from './QuestionAttempt.js'
import QuestionResponse from "./QuestionResponse.js";
//import SubmitButton from "./SubmitButton.js";
import NextButton from "./NextButton.js";
import { useSelector, useDispatch } from "react-redux";
import { setQuestion } from "../../redux/question.js";
import {setQuestionAttemptId} from "../../redux/question_att_id.js"
import {setQuizAttemptId} from "../../redux/quiz_att_id.js"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setEndOfQuiz } from '../../redux/endofquiz'
import { setShowQuestionAttempt } from "../../redux/showquestionattempt.js";


export default function QuizAttempt(props) {

  
  const rootpath = useSelector((state) => state.rootpath.value)
    const question_attempt_response = useSelector((state) => state.question_attempt_reponse.value)
   
    const question = useSelector((state) => state.question.value)
    
    //const [quizattemptid, setQuizattemptid] = useState('')
    //const [showquestionattempt, setShowquestionattempt] = useState(true)
    const showquestionattempt = useSelector((state) => state.showquestionattempt.value)

    const dispatch = useDispatch()

    const location = useLocation()
    const parts = location.pathname.split('/')
    const quizid = parts[parts.length-1]
    
    const user = sessionStorage.getItem('user')

    const end_of_quiz = useSelector((state) => state.endofquiz.value)
    
    const url = rootpath + "/api/quiz_attempts/find_create/" + quizid + '/' + user
    
    useEffect(() => {
        //console.log(" 3) in QuizAttempt useEffect.About to call axios to find/create quiz attempt")
        axios.get(url).then((response) => {
          //console.log('  QuizAtt in useEffect after calling axios response data=',response.data)
          dispatch(setEndOfQuiz(false))
          dispatch(setQuestion(response.data.question))
          dispatch(setShowQuestionAttempt(true))
          dispatch(setQuestionAttemptId(response.data.question_attempt_id))
          //setQuizattemptid(response.data.quiz_attempt_id)
          dispatch(setQuizAttemptId(response.data.quiz_attempt_id))
        });
      },[url, dispatch]);
 
      return(
        <>
        <Container>
      <Row>
        <Col style={{backgroundColor:'#e6d3c3'}} xs={10}>
        
        {question && 
          ( showquestionattempt ?
            <QuestionAttempt /> : 
            <>
            <QuestionResponse response_content={question_attempt_response}/>
            { end_of_quiz ?  <div>END OF QUIZ</div> 
               : 
                <NextButton next_question_number={question.question_number +1} />
            }
            </>
          )
        }
      
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
       </>
    )
}

