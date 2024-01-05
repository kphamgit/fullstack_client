import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {setValue} from '../../redux/attemptResponse'
import styled from 'styled-components'
import getClozeQuestionUserAnswer from './GetClozeQuestionUAnswer'
import { setEndOfQuiz } from '../../redux/endofquiz'


const Button = styled.button`
background-color:brown;
color:white;
padding:5px 15px;
`

function SubmitButton({quiz_attempt_id, question_attempt_id, question_format, childToParent}) {
  const rootpath = useSelector((state) => state.rootpath.value)
  
  //const question_attempt_reponse = useSelector((state) => state.question_attempt_reponse.value)
    const dispatch = useDispatch()
    var user_answer =  useSelector((state) => state.answer.value)
    var endofquiz =  useSelector((state) => state.endofquiz.value)
    console.log(" Submit END OF QUIX"+endofquiz)
    //console.log("UUUUUUUUUUUUUUUUU answer ="+user_answer)
    const process_question_attempt = async () => {
        if (question_format == 1)
          user_answer = getClozeQuestionUserAnswer()
        else if (question_format == 6) {
          const manswer = document.getElementsByClassName('word_scrambler_items')
          //console.log("BBBBBBBBBBBBBBBBBBBBBBBBB")
          var temp_arr = []
          for (let i = 0; i < manswer.length; i++) {
            var mvalue = manswer[i].innerHTML
            //console.log("QQQQQQQQQQQQQQQQQQQQQQQ")
            //console.log("IIIIIIIIIII"+mvalue)
            temp_arr.push(mvalue)
          }
          user_answer = temp_arr.join('/')
          //console.log("QQQQQQQQQQQQ",user_answer)
        }
        //console.log("in process question atempt questionattempt = ", questionattempt)
        //console.log("in process question atempt user answer = ", user_answer)
        var url1 = rootpath + '/api/question_attempts/' + question_attempt_id + '/process_attempt'
        const firstRequest = await axios.post(url1,{user_answer: user_answer})
        const data1 = firstRequest.data
        //console.log(" data1",data1)
        dispatch(setValue(data1))
        childToParent(false)
        console.log("data1 question number"+data1.question_number)
        const next_question_number = data1.question_number + 1
        //if (!data1) {
        var url2 = rootpath + '/api/quiz_attempts/' + quiz_attempt_id + '/get_next_question/' + next_question_number
        const secondRequest = await axios.get(url2)
        //console.log("CCCCCCCC",secondRequest.data)
        if (secondRequest.data.end_of_quiz) {
          console.log(" END OF QUIX")
            dispatch(setEndOfQuiz(true))
        }
      
    }

  return (
    <>
    <div>&nbsp;</div>
    <Button  onClick={() => process_question_attempt()}>Submit</Button>
    </>
  )
}

export default SubmitButton