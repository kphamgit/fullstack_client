import React, { useEffect, useState } from 'react';
import axios from "axios";
import ClozeQuestionAttempt1 from './ClozeQA1';
import SubmitButton1 from './SubmitButton1';
//import { useSelector } from 'react-redux';

function LiveQuestionAttempt({socket}) {

    const [question, setQuestion] = useState(null)
    const [score, setScore] = useState(0)
    //const username = useSelector((state) => state.username.value)
    const [showSubmit, setShowSubmit] = useState(false)
   // const [scoreReceived, setScoreReceived] = useState('')
    const [totalScoreReceived, setTotalScoreReceived] = useState(0)
    
    /*
    useEffect(() => {
        console.log("GGGGGGGGGGGGGGGGGGGGGGGG score=", score)
        if (score) {
            console.log("emit score to server")
            socket.emit('live_score', {score: score, user: username})
        }
    },[score])
    */
    useEffect(() => {
        socket.on('live_score', arg => {
            console.log("live score received from server arg",arg)
            console.log("MMMMMMMM"+(totalScoreReceived + arg.score))
            let total = totalScoreReceived + arg.score
            let el = document.getElementById(arg.user)
            setTotalScoreReceived(totalScoreReceived + arg.score)
            el.innerHTML = `<span>${arg.user}&nbsp;:&nbsp;${total}</span>`
            //setScoreSender(arg.user)
            //setScoreReceived(arg.score)
        })
        return () => {
            //event registration cleanup
            console.log("cleaned up live_score")
            socket.off("live_score")
           
        
        }   
    })

    const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';
    console.log("URL="+URL)
    const getNextQuestion = () => {
        //alert("here")
        //api/quizzes/:id/get_question/:question_number',
        var url = URL + '/api/quizzes/18/get_question/1'
        axios.get(url).then((response) => {
            //console.log(' Next button... response data=',response.data)
            if (response.data.end_of_quiz) {
                    //setEndofquiz(true)
                    console.log("END OF QUIX")
            }
            else {
                console.log(response.data)
                setQuestion(response.data.question)
                setShowSubmit(true)
                //dispatch(setQuestion(response.data.question))
                //dispatch(setId(response.data.question_attempt_id))
                //childToParent(true)
            }
        });
      }

  return (
    <>
    <div>LiveQuestionAttempt</div>
    <div><button onClick={getNextQuestion}>Get Question</button></div>
    { question &&
        <div><ClozeQuestionAttempt1 question={question}/></div>
}
{ showSubmit && <SubmitButton1 style={{backgroundColor:'white'}} socket={socket} question={question} setTheScore={setScore} toggleShowSubmit={setShowSubmit}/> }
    <div style={{backgroundColor:'green', color: "white"}}>
        <div id = "basic"> basic = </div>
        <div id = "linhdan"> </div>
        <div id = "lockim">  </div>
        <div id = "giabinh">  </div>
        <div id = "khanhyen"> </div>
        <div id = "bichphuong">  </div>
        <div id = "thienkim">  </div>
        <div id = "quocminh">  </div>
        <div id = "nhatminh">  </div>
    </div>
    </>
  )
}

export default LiveQuestionAttempt