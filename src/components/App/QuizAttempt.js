import React from "react";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from './App.js'

export default function QuizAttempt(props) {

    const [myhtml, setMyhtml] = useState('')

    const {loggedinname, setLoggedinname}  = useContext(Context);
    console.log(" in Quiz attempt loggedinName ="+loggedinname) 

    //const [myhtml, setMyhtml] = useState['']

    const location = useLocation()
    console.log("<<<<<<<<"+location.pathname )
    const parts = location.pathname.split('/')
    console.log(parts)
    const quizid = parts[parts.length-1]
    console.log(quizid)
    
    
    const url = "http://localhost:5000/api/quiz_attempts/find_create/" + quizid + '/' + loggedinname
    console.log(" 2) QuizAttempt... url ="+url)
    
    useEffect(() => {
        console.log(" 3) in QuizAtt useEffect. About to call axios")
        axios.get(url).then((response) => {
          console.log(' 4) QuizAtt useEffect get response data=',response.data)
          //setPost(response.data);
          setMyhtml(response.data)
          console.log("5) in QuizAtt response data = ", response.data)
        });
      }, [url]);

/*
    console.log(" in quiz attempt. About to call axios")
    axios.get(url).then((response) => {
      console.log('  quiz_attempt  response data=',response.data)
     // setContenthtml(response.data)
        //setMyhtml(response.data)
      //console.log("5) in sub_cat response data = ", response.data)
    });
  */
  
    return(
        <>
        <h2>QuizAttempt</h2>
        <div>{props.username}</div>
        <div dangerouslySetInnerHTML={{ __html: myhtml }}></div>
        </>
    )
}