import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { SocketContext } from './Home';


function EmitLiveQuestion() {

    const socket = useContext(SocketContext);
    const [questionnumber, setQuestionNumber] = useState('')
    const [questionContent, setQuestionContent] = useState('')
    const [questionPrompt, setQuestionPrompt] = useState('')
    const [questionAnswerKey, setQuestionAnswerKey] = useState('')
   
    const getNextQuestion = () => {
          socket.emit("next_live_question", 
              {source: 'live', question_number: questionnumber, format: 1, prompt : questionPrompt, content: questionContent, answer_key: questionAnswerKey, score: "5"}
          )
    }

  return (
    <>
    <div>
        <div>
        <Form.Group className="mb-3">
        <Form.Control as="input" style={{color: "yellow", backgroundColor:"#473626"}} placeholder="Question number" htmlSize='5' onChange={e => setQuestionNumber(e.target.value)} />
           <Form.Control as="input" style={{color: "yellow", backgroundColor:"#473626"}} placeholder="Question content" htmlSize='10' onChange={e => setQuestionContent(e.target.value)} />
          <Form.Control as="input" style={{color: "yellow", backgroundColor:"#473626"}} placeholder="Prompt" htmlSize='10' onChange={e => setQuestionPrompt(e.target.value)} />
          <Form.Control as="input" style={{color: "yellow", backgroundColor:"#473626"}} placeholder="Answer Key" htmlSize='10' onChange={e => setQuestionAnswerKey(e.target.value)} />
      </Form.Group>
      </div>
      <div>
       <Button style={{backgroundColor:"blue"}} variant="success" onClick={getNextQuestion}>Send Question</Button>
       <Button style={{backgroundColor:"blue"}} variant="success" onClick={getNextQuestion}>Get Cloze Question Answer</Button>
        </div>
    </div>
    <br />
    </>
  )
}

export default EmitLiveQuestion