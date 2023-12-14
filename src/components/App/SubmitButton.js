import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {setValue} from '../../redux/attemptResponse'
import styled from 'styled-components'
import getClozeQuestionUserAnswer from './GetClozeQuestionUAnswer'

const Button = styled.button`
background-color:brown;
color:white;
padding:5px 15px;
`

function SubmitButton({question_attempt_id, question_format, childToParent}) {
  //const question_attempt_reponse = useSelector((state) => state.question_attempt_reponse.value)
    const dispatch = useDispatch()
    var user_answer =  useSelector((state) => state.answer.value)
    const process_question_attempt = () => {
        if (question_format == 1)
          user_answer = getClozeQuestionUserAnswer(question_format)
          
        //console.log("in process question atempt questionattempt = ", questionattempt)
        console.log("in process question atempt user answer = ", user_answer)
        var url = 'http://localhost:5000/api/question_attempts/' + question_attempt_id + '/process_attempt'
        axios.post(url,{user_answer: user_answer}
            ).then((response) => {
            console.log(' Submit... response data=',response.data)
            dispatch(setValue(response.data))
            //{user_answer: user_answer}
            //console.log("5) in QuizAtt response data = ", response.data)
            childToParent(false)
          });
    }

  return (
    <>
    <div>&nbsp;</div>
    <Button  onClick={() => process_question_attempt()}>Submit</Button>
    </>
  )
}

export default SubmitButton