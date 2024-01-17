import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {setValue} from '../../redux/attemptResponse'
import styled from 'styled-components'
import getClozeQuestionUserAnswer from './GetClozeQuestionUAnswer'
import { setEndOfQuiz } from '../../redux/endofquiz'
import { setShowQuestionAttempt } from '../../redux/showquestionattempt'

const Button = styled.button`
background-color:brown;
color:white;
padding:5px 15px;
`

//function SubmitButton2({sendblob, quiz_attempt_id, question_attempt_id, question_format}) {
  function SubmitButtonRecordQA({sendblob, ...props}) {

    useEffect( () => {
      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
      console.log(props)
    },[])
  
 
  const rootpath = useSelector((state) => state.rootpath.value)
  const username = useSelector((state) => state.username.value)
  //
  //const question_attempt_reponse = useSelector((state) => state.question_attempt_reponse.value)
    const dispatch = useDispatch()
    const answerarray = useSelector((state) => state.answerarray.value)
    let user_answer =  useSelector((state) => state.answer.value)
    
    //var endofquiz =  useSelector((state) => state.endofquiz.value)
    //console.log(" Submit END OF QUIX"+endofquiz)
    //console.log("UUUUUUUUUUUUUUUUU answer ="+user_answer)
    const process_question_attempt = async () => {
      //console.log("HEEEEE blob", myblob)
    
            alert("sssssend to google")
            user_answer= []
            
        //console.log("in process question atempt questionattempt = ", questionattempt)
        //console.log("in process question atempt user answer = ", user_answer)
        var url1 = rootpath + '/api/question_attempts/' + props.question_attempt_id + '/process_attempt'
        const firstRequest = await axios.post(url1,{user_answer: user_answer})
        const data1 = firstRequest.data
        //console.log(" data1",data1)
        dispatch(setValue(data1))
        //toggleShowQuestionAttempt(false)
        dispatch(setShowQuestionAttempt(false))
        //console.log("data1 question number"+data1.question_number)
        const next_question_number = data1.question_number + 1
        //if (!data1) {
        var url2 = rootpath + '/api/quiz_attempts/' + props.quiz_attempt_id + '/get_next_question/' + next_question_number
        const secondRequest = await axios.get(url2)
        console.log("data from second request CCCCCCCC",secondRequest.data)
        if (secondRequest.data.end_of_quiz) {
          //console.log(" END OF QUIX")
            dispatch(setEndOfQuiz(true))
        }
        sendblob()
    }

  return (
    <>
    <div>&nbsp;</div>
    <Button  onClick={() => process_question_attempt()}>Submit2</Button>
    </>
  )
}

export default SubmitButtonRecordQA