import React, { useEffect, useState } from 'react';
import axios from "axios";
import ClozeQuestionAttempt from './ClozeQA';
import SubmitButtonLive from './SubmitButtonLive';
import { useSelector } from 'react-redux';
import ButtonSelectQuestionAttempt from './ButtonSelectQA'
import { Radio } from './Radio';
import WordsScrambler from './WordsScrambler'
import ReactPlayer from 'react-player';
import QuestionResponseLive from './QuestionResponseLive';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LiveScoreBoard from './LiveScoreBoard';

function LiveQuestionAttempt({socket}) {

    const [question, setQuestion] = useState(null)
    const [questionInfo, setQuestionInfo] = useState('')
    const [score, setScore] = useState(0)
    const user = useSelector((state) => state.user.value)
    //const question_attempt_response = useSelector((state) => state.question_attempt_reponse.value)
    const [attemptResponse, setAttemptResponse] = useState('')
    //console.log("USER ************* = ",user)
    const [showSubmit, setShowSubmit] = useState(false)
   // const [scoreReceived, setScoreReceived] = useState('')
    const [totalScoreReceived, setTotalScoreReceived] = useState(0)
    const [showResponse, setShowResponse] = useState(false)
    
   
    useEffect(() => {
        socket.on('live_score', arg => {
            //console.log("live score received from server arg",arg)
            //console.log("MMMMMMMM"+(totalScoreReceived + arg.score))
            let total = totalScoreReceived + arg.score
            let el = document.getElementById(arg.user)
            setTotalScoreReceived(totalScoreReceived + arg.score)
            el.innerHTML = `<span>${total}</span>`
 
        })

        return () => {
            //event registration cleanup
            //console.log("cleaned up live_score")
            socket.off("live_score")
        }   
    })

    useEffect(() => {
        console.log("in useEffect attemptResponse", attemptResponse)
    },[attemptResponse])

    useEffect(() => {
        socket.on('next_live_question', arg => {
            //console.log("next live question received arg=",arg)
            var url = URL + '/api/quizzes/' + arg.quiz_id + '/get_question/' + arg.question_number
            axios.get(url).then((response) => {
                //console.log(' Next button... response data=',response.data)
                if (response.data.end_of_quiz) {
                        //setEndofquiz(true)
                        console.log("END OF QUIX")
                }
                else {
                    //console.log(response.data)
                    setQuestion(response.data.question)
                    setShowSubmit(true)
                }
            });
        })

        return () => {
            //event registration cleanup
            socket.off("next_live_question")
        }   
    })
    const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';
    //console.log("URL="+URL)
    const getNextQuestion = () => {
        if (questionInfo.length == 0) {
            alert("Please enter quiz id and question number separated by a comma")
        }
        else if (questionInfo.indexOf(',') >= 0 ) {
            //let next_question_info = document.getElementById("next_question_info")
            let quiz_id = questionInfo.split(',')[0].trim()
            let question_number = questionInfo.split(',')[1].trim()
            //console.log("XXXXXX"+quiz_id+"YYYYY"+question_number+"ZZZZZZZZZZZZZ")
            socket.emit("next_live_question", {quiz_id : quiz_id, question_number: question_number})
        }
        else {
            alert("Quiz id and question number must be separated by a comma")
        }
    }

      let students_basic = ["basic","linhdan", "lockim", "giabinh", "khanhyen", "thienkim", "quocminh", "nhatminh", "bichphuong"]
      let students_intermediate = ['basic','nguyenkhang', 'honghoa', 'dinhchuong']

      
        const renderCurrentQA = (question) => {
               switch (question.format) {
                 case 1:
                   return <ClozeQuestionAttempt question={question} />
                 case 3:
                   return <ButtonSelectQuestionAttempt question={question}/>
                 case 4:
                     return <Radio question={question}/>
                 case 6:
                   return <WordsScrambler question={question}/>
                 default:
                   return null
               }
             }
           

  return (
    <>
    
    { user.role === "teacher" && 
    <div>
        <button onClick={getNextQuestion}>Get Question</button>
        <div><input type="text" onChange={e => setQuestionInfo(e.target.value)} /></div>
    </div>}
    { question &&
        <>
        <div>Question: { question.question_number}</div>
        <div dangerouslySetInnerHTML={{ __html: question.instruction }}></div>
            <p style={{color:'brown'}}>{question.prompt}</p>    
        <div>
        {question.audio_src && <audio src={question.audio_src} controls />}
        </div> 
            {question.video_src && <ReactPlayer url={question.video_src} controls />}
            {  renderCurrentQA(question)  }
         </>
}
{ showSubmit ?
    <SubmitButtonLive style={{backgroundColor:'white'}} socket={socket} question={question} setTheScore={setScore} toggleShowSubmit={setShowSubmit} toggleShowResponse={setShowResponse} setResponse={setAttemptResponse}/> 
    : (showResponse && (showResponse && <QuestionResponseLive response_content={attemptResponse}/>))
    }
   
    </>
  )
}

export default LiveQuestionAttempt