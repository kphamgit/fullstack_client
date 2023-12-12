import React from "react";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from './App.js'
import QuestionAttempt from './QuestionAttempt.js'
import QuestionResponse from "./QuestionResponse.js";
import SubmitButton from "./SubmitButton.js";
import NextButton from "./NextButton.js";

export default function QuizAttempt(props) {

    const [myhtml, setMyhtml] = useState('')
    const [questionattempt, setQuestionattempt] = useState({})
    const [showquestionattempt, setShowquestionattempt] = useState(true)

    const {loggedinname, setLoggedinname}  = useContext(Context);
    console.log(" in Quiz attempt loggedinName ="+loggedinname) 

    const location = useLocation()
    const parts = location.pathname.split('/')
    const quizid = parts[parts.length-1]
    
    const user = sessionStorage.getItem('user')
    
    const url = "http://localhost:5000/api/quiz_attempts/find_create/" + quizid + '/' + user
    
    useEffect(() => {
        //console.log(" 3) in QuizAtt useEffect. About to call axios")
        axios.get(url).then((response) => {
          console.log('  QuizAtt in useEffect response data=',response.data)
          //setPost(response.data);
          setMyhtml(response.data.content_html)
          setQuestionattempt(response.data.question_attempt)
          //console.log("5) in QuizAtt response data = ", response.data)
        });
      }, [url]);

    const setHTMLcontent = (childdata) => {
      setMyhtml(childdata)
    }
    const updatequestionattempt = (childdata) => {
      setQuestionattempt(childdata)
    }
    const childToParent = (childdata) => {
      setShowquestionattempt(childdata);
    }
  
    return(
        <>
        <h2>QuizAttempt</h2>
        <div>{props.username}</div>
        {showquestionattempt ? <QuestionAttempt myhtml={myhtml} /> : <QuestionResponse />}
        {showquestionattempt ? <SubmitButton questionattempt={questionattempt} childToParent ={childToParent}/> : <NextButton questionattempt= {questionattempt} childToParent ={childToParent} setHTMLcontent = {setHTMLcontent} updatequestionattempt ={updatequestionattempt}/>}
        </>
    )
}

