import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
//import styled from 'styled-components'
import getClozeQuestionUserAnswer from './GetClozeQuestionUAnswer'
//import { setEndOfQuiz } from '../../redux/endofquiz'
import Button from "react-bootstrap/Button"


/*
const Button = styled.button`
background-color:brown;
color:white;
padding:5px 15px;
`
*/

function SubmitButtonLive({socket, question, setTheScore, toggleShowSubmit, toggleShowResponse, setResponse }) {

  const username = useSelector((state) => state.username.value)
  const rootpath = useSelector((state) => state.rootpath.value)
  const answerarray = useSelector((state) => state.answerarray.value)
  
  //const question_attempt_reponse = useSelector((state) => state.question_attempt_reponse.value)
    //const dispatch = useDispatch()
    var user_answer =  useSelector((state) => state.answer.value)
    //console.log(" Submit END OF QUIX"+endofquiz)
    //console.log("UUUUUUUUUUUUUUUUU answer ="+user_answer)

    
    //const process_question_attempt = async () => {
     //   alert("here")
    //}
    const process_question_attempt = async () => {
        if (question.format === 1) {
          user_answer = getClozeQuestionUserAnswer()
          if (user_answer.length === 0) {
            alert("Please enter input")
            return false
          }
        }
        else if (question.format === 3) {
          if (user_answer.length === 0 ) {
            alert("Please select an option")
            return false
          }
        }
        else if (question.format === 6) {
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
        else if (question.format === 8) {
          //console.log("XXXXXXXXXXXXX",answerarray)
          user_answer = answerarray.join('/')
          if (user_answer.length === 0) {
            alert("Please select word(s)")
            return false
          }
        }
        //console.log("in process question atempt questionattempt = ", questionattempt)
        //console.log("in process question atempt user answer = ", user_answer)
        var url = rootpath + `/api/question_attempts/process_attempt_live/${question.id}`
        const firstRequest = await axios.post(url,{user_answer: user_answer})
        const response_data = firstRequest.data
        //console.log(" response data = ",response_data)
        //dispatch(setValue(data))
        setResponse(response_data)
        socket.emit('live_score', {score: response_data.score, user: username})
        setTheScore(response_data.score)
        toggleShowSubmit(false)
        toggleShowResponse(true)
    }

  return (
    <>
    <div>&nbsp;</div>
    <Button variant="success" onClick={() => process_question_attempt()}>Submit Live</Button>
    </>
  )
}

export default SubmitButtonLive