import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setQuestion } from "../../redux/question.js";
import { setId } from "../../redux/question_att_id.js";
import styled from 'styled-components'
import { setShowQuestionAttempt } from '../../redux/showquestionattempt.js';

//const ilink = '/logout' 
const Button = styled.button`
background-color:brown;
color:white;
padding:5px 15px;
`

function NextButton({quiz_attempt_id, next_question_number, toggleShowQuestionAttempt }) {
//console.log(" ********** in next button")
    const rootpath = useSelector((state) => state.rootpath.value)
    //const showquestionattempt = useSelector((state) => state.showquestionattempt.value)
    const dispatch = useDispatch()
    const [endofquiz, setEndofquiz] = useState(false)
    const get_next_question = () => {
        console.log("next quiz attempt id"+quiz_attempt_id)
        console.log("next question number"+next_question_number)
        
        var url = rootpath + '/api/quiz_attempts/' + quiz_attempt_id + '/creat_next_question_attempt/' + next_question_number
        axios.get(url).then((response) => {
            if (response.data.end_of_quiz) {
                    setEndofquiz(true)
            }
            else {
                //onsole.log("RRRRRRRRRRRRRR",response.data.question)
                dispatch(setQuestion(response.data.question))
                dispatch(setId(response.data.question_attempt_id))
                //toggleShowQuestionAttempt(true)
                dispatch(setShowQuestionAttempt(true))
            }
        });
    
    }

    if (endofquiz) {
        return <h3>END OF QUIZ</h3>
    }
    return ( 
        <>
        <pre></pre>
        <Button onClick={() => get_next_question()}>Next</Button>
        </>
    )
}

export default NextButton