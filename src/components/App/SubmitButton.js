import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {setValue} from '../../redux/attemptResponse'
import styled from 'styled-components'

const Button = styled.button`
background-color:brown;
color:white;
padding:5px 15px;
`

function SubmitButton({questionattempt, childToParent}) {
  //const question_attempt_reponse = useSelector((state) => state.question_attempt_reponse.value)
  const dispatch = useDispatch()

    const process_question_attempt = () => {
      var input_error = false
      var cloze_answers = document.getElementsByClassName("cloze_answer");
      const marray = [];
      var user_answer;
      for (let i = 0; i < cloze_answers.length; i++) {
        var input_value = cloze_answers[i].value
        console.log("ZZZZZZZZZZZZ"+input_value)
        if (input_value.length > 0 ) {
                marray.push(cloze_answers[i].value);
        }
        else {
              input_error = true
        }
      }
      if (!input_error ) {
        if (marray.length > 1) {
          user_answer = marray.join('/')
        }
        else {
          user_answer = marray[0]
        }
      }
    
        console.log("in process question atempt questionattempt = ", questionattempt)
        var url = 'http://localhost:5000/api/question_attempts/' + questionattempt.id + '/process_attempt'
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