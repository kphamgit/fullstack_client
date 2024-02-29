import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { SocketContext } from './Home';

function EmitQuizQuestion() {

    const socket = useContext(SocketContext);
    const [questionInfo, setQuestionInfo] = useState('')
    const [questionnumber, setQuestionNumber] = useState('')
   
    const getNextQuestion = () => {
        if (questionInfo.length === 0) {
            alert("Please enter quiz id and question number separated by a comma")
        }
        else if (questionInfo.indexOf(',') >= 0 ) {
            let quiz_id = questionInfo.split(',')[0].trim()
            let question_number = questionInfo.split(',')[1].trim()
            socket.emit("next_live_question",{source: 'quiz',  question_number: questionnumber, quiz_id : quiz_id, question_number: question_number})
        }
        else {
            alert("Quiz id and question number must be separated by a comma")
        }
        
    }

  return (
    <>
    <div>
        <div>
        <Form.Control as="input" className="w-30" placeholder="Question number" htmlSize='5' onChange={e => setQuestionNumber(e.target.value)} />
        <Form.Control as="input" className="w-30" placeholder="Enter quiz_id and question number separated by a comma" htmlSize='10' onChange={e => setQuestionInfo(e.target.value)} />
        <Button variant="success" onClick={getNextQuestion}>Get Question</Button>
        </div>
    </div>
    <br />
    </>
  )
}

export default EmitQuizQuestion