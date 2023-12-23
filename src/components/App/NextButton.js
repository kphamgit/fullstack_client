import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setQuestion } from "../../redux/question.js";
import { setId } from "../../redux/question_att_id.js";
import styled from 'styled-components'

//const ilink = '/logout' 
const Button = styled.button`
background-color:brown;
color:white;
padding:5px 15px;
`

function NextButton({quiz_attempt_id, next_question_number, childToParent }) {
//console.log(" ********** in next button")
    const rootpath = useSelector((state) => state.rootpath.value)
    const dispatch = useDispatch()
    const [endofquiz, setEndofquiz] = useState(false)
    const get_next_question = () => {
        var url = rootpath + '/api/quiz_attempts/' + quiz_attempt_id + '/get_next_question/' + next_question_number
        axios.get(url).then((response) => {
            //console.log(' Next button... response data=',response.data)
            if (response.data.end_of_quiz) {
                    setEndofquiz(true)
            }
            else {
                dispatch(setQuestion(response.data.question))
                dispatch(setId(response.data.question_attempt_id))
                childToParent(true)
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