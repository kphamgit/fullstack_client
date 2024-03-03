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
import { clearQuestion } from '../../redux/livequestion';
import { setStudentScores } from '../../redux/studentscores';

function LiveQuestionAttempt() {

    const [livequestionnumber, setLiveQuestionNumber] = useState('')
    const socket = useContext(SocketContext);
    const [score, setScore] = useState(0)
    const question = useSelector((state) => state.live_question.value )
    const studentscores = useSelector((state) => state.studentscores.value)
    const dispatch = useDispatch()
    const [attemptResponse, setAttemptResponse] = useState('')
    const [showSubmit, setShowSubmit] = useState(false)
    const [showResponse, setShowResponse] = useState(false)
    
    const rootpath = useSelector((state) => state.rootpath.value)
   
    useEffect( () => {
        //Don't delete this. Update component upon new questin arrival
        //console.log("update component...",question)???
    },[question])

    useEffect(() => {
        //register "socket.on" event upon component mount
        //or when one of the dependencies changes value
        socket.on('next_live_question', arg => {
            //console.log("next live question = ",arg)
            setLiveQuestionNumber(arg.question_number)
            //use spread operator tip to remove a property from an object:
            //remove source property from arg because it won't be needed
            const {source, ...restOfArg} = arg
            //console.log("next live question resetOfArg= ",restOfArg)
            dispatch(clearQuestion())
            if (source === 'live') {
                dispatch(setLiveQuestion(restOfArg))
                setShowSubmit(true)
            }
            else if (source === 'quiz'){
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
            }
            else {
                console.log("invalid question source")
            }
        })

        return () => {
            //event registration cleanup (happens upon component dismount)
            //i.e, user goes to another link/route/page
            //console.log("event registration cleanup")
            socket.off("next_live_question")
        }   
    },[rootpath,socket, dispatch])
    
    
  return (
    <>
    <br />
    { question &&
        <>
        
        <p>{question.prompt}</p>    
        <div>
        {question.audio_src && <audio src={question.audio_src} controls />}
        </div> 
            {question.video_src && <ReactPlayer url={question.video_src} controls />}
            <div style = {{backgroundColor:"f2caa7"}}>
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
            </div>
         </>
}
{ showSubmit ?
    <SubmitButtonLive style={{backgroundColor:'white'}} socket={socket} livequestionnumber={livequestionnumber} question={question} setTheScore={setScore} toggleShowSubmit={setShowSubmit} toggleShowResponse={setShowResponse} setResponse={setAttemptResponse}/> 
    : (showResponse && (showResponse && <QuestionResponseLive response_content={attemptResponse}/>))
    }
   
    </>
  )
}

export default LiveQuestionAttempt