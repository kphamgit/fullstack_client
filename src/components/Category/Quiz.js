import React from "react";
import {Link} from 'react-router-dom'
import { useContext, useEffect } from "react";
import { Context } from '../App/App.js'


export default function Quiz(props) {
    return(
        <>
        <Link to={`/quiz_attempts/take_quiz/${props.quiz_content.id}`} >{props.quiz_content.name}</Link>
        </>
    )
}