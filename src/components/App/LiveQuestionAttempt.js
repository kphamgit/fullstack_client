import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import ClozeQuestionAttempt from './ClozeQA';
import SubmitButtonLive from './SubmitButtonLive';
import { useSelector, useDispatch } from 'react-redux';
import ButtonSelectQuestionAttempt from './ButtonSelectQA'
import { Radio } from './Radio';
import WordsScrambler from './WordsScrambler'
import ReactPlayer from 'react-player';
import QuestionResponseLive from './QuestionResponseLive';
import WordsSelect from './WordsSelect';
import RecordQuestionAttempt from './RecordQA';
import { SocketContext } from './Home';
//import { setQuestion } from '../../redux/question';
import { setLiveQuestion } from '../../redux/livequestion';

function LiveQuestionAttempt() {

    const socket = useContext(SocketContext);
    const [score, setScore] = useState(0)
    const question = useSelector((state) => state.live_question.value )
    const dispatch = useDispatch()
    const [attemptResponse, setAttemptResponse] = useState('')
    const [showSubmit, setShowSubmit] = useState(false)
    const [totalScoreReceived, setTotalScoreReceived] = useState(0)
    const [showResponse, setShowResponse] = useState(false)
    
    const rootpath = useSelector((state) => state.rootpath.value)
   
    useEffect(() => {
        socket.on('live_score', arg => {
            let total = totalScoreReceived + arg.score
            let el = document.getElementById(arg.user)
            setTotalScoreReceived(totalScoreReceived + arg.score)
            el.innerHTML = `<span>${total}</span>`
 
        })

        return () => {
            socket.off("live_score")
        }   
    })

    
    useEffect(() => {
        socket.on('next_live_question', arg => {
          //alert("HERE")
            var url = rootpath + '/api/quizzes/' + arg.quiz_id + '/get_question/' + arg.question_number
            axios.get(url).then((response) => {
                //console.log(' Next button... response data=',response.data)
                if (response.data.end_of_quiz) {
                        //setEndofquiz(true)
                        console.log("END OF QUIZ")
                }
                else {
                    dispatch(setLiveQuestion(response.data.question))
                    //setQuestion(response.data.question)
                    setShowSubmit(true)
                }
            });
        })

        return () => {
            //event registration cleanup
            socket.off("next_live_question")
        }   
    },[rootpath,socket, dispatch])
    
  return (
    <>
    <br />
    { question &&
        <>
        <div>Question: { question.question_number}</div>
        <div dangerouslySetInnerHTML={{ __html: question.instruction }}></div>
            <p style={{color:'brown'}}>{question.prompt}</p>    
        <div>
        {question.audio_src && <audio src={question.audio_src} controls />}
        </div> 
            {question.video_src && <ReactPlayer url={question.video_src} controls />}
            {(() => {
            switch (question.format) {
              case 1:
                return <ClozeQuestionAttempt live_flag={true} />
              case 3:
                  return <ButtonSelectQuestionAttempt live_flag={true} />
              case 4: 
                    return <Radio live_flag={true} />
              case 6:
                  return <WordsScrambler live_flag={true} />
              case 8:
                    return <WordsSelect live_flag={true} />
              case 9:
                      return <RecordQuestionAttempt />
              default:
                return null
            }
      })()}
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