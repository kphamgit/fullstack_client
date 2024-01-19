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
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import WordsSelect from './WordsSelect';
import RecordQuestionAttempt from './RecordQA';
import { SocketContext } from './Home';
import { setQuestion } from '../../redux/question';
import { setLiveQuestion } from '../../redux/livequestion';

function LiveQuestionAttemptTeacher() {

    const socket = useContext(SocketContext);
    const [questionInfo, setQuestionInfo] = useState('')
    const [score, setScore] = useState(0)
    const user = useSelector((state) => state.user.value)
    const live_question = useSelector((state) => state.live_question.value )
    const dispatch = useDispatch()
    const [attemptResponse, setAttemptResponse] = useState('')
    const [showSubmit, setShowSubmit] = useState(false)
    const [totalScoreReceived, setTotalScoreReceived] = useState(0)
    const [showResponse, setShowResponse] = useState(false)
    
    const rootpath = useSelector((state) => state.rootpath.value)
   
    /*
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
    */

    /*
    useEffect(() => {
        socket.on('next_live_question', arg => {
            var url = rootpath + '/api/quizzes/' + arg.quiz_id + '/get_question/' + arg.question_number
            axios.get(url).then((response) => {
                //console.log(' Next button... response data=',response.data)
                if (response.data.end_of_quiz) {
                        //setEndofquiz(true)
                        console.log("END OF QUIZ")
                }
                else {
                    dispatch(setLiveQuestion(response.data.question))
                    setShowSubmit(true)
                }
            });
        })

        return () => {
            //event registration cleanup
            socket.off("next_live_question")
        }   
    })
    */

    //const URL = process.env.NODE_ENV === 'production' ? "https://www.tienganhtuyhoa.com" : 'http://localhost:5000';
    //console.log("URL="+URL)
    //this function is used only by teacher
    const getNextQuestion = () => {
        if (questionInfo.length === 0) {
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

  return (
    <>
    
    { user.role === "teacher" && 
    <div>
        
        <div>
        <Form.Control as="input" className="w-30" placeholder="Enter quiz_id and question number separated by a comma" htmlSize='10' onChange={e => setQuestionInfo(e.target.value)} />
        <Button variant="success" onClick={getNextQuestion}>Get Question</Button>
        </div>
    </div>}
    <br />
   

    </>
  )
}

export default LiveQuestionAttemptTeacher