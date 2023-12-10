import React from "react";
import { useEffect, useContext } from "react";
import axios from "axios";
import { Context } from './App.js'

export default function QuizAttempt(props) {

    const {loggedinname, setLoggedinname, quizid, setQuizid}  = useContext(Context);
    console.log(" in QUiz attempt loggedinName ="+loggedinname)
    console.log(" in QUiz attempt quizid ="+quizid)
    
    
    
    //const {quizid, setQuizid} = 
    const url = "http://localhost:5000/api/quiz_attempts/find_create/106"
  //console.log(" 2) in subcate... url ="+url)
  useEffect(() => {
    console.log(" in quiz attempt useEffect. About to call axios")
    axios.get(url).then((response) => {
      console.log('  quiz_attempt useEffect  response data=',response.data)
      //setPost(response.data);
      //console.log("5) in sub_cat response data = ", response.data)
    });
  }, [url]);

    return(
        <>
        <h2>QuizAttempt</h2>
        <div>{props.username}</div>
        </>
    )
}