import React from "react";
import {Link} from 'react-router-dom'
import { useContext, useEffect } from "react";
import { Context } from '../App/App.js'


export default function Quiz(props) {

    /*
    const {quizid, setQuizid}  = useContext(Context);
    
    useEffect(() => {
        setQuizid(props.quiz_content.id)
    }, [quizid]);
    */
    return(
        <>
        <h2>Quiz</h2>
        <div>{props.quiz_content.name}</div>
        <div>{props.quiz_content.id}</div>
        <Link to={`/quiz_attempts/take_quiz/${props.quiz_content.id}`} >Take quiz</Link>
        </>
    )
}