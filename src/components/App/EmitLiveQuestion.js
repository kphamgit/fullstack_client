import React, { useState, useContext, useEffect } from 'react';
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
          setQuestionNumber(a => parseInt(a) + 1);
    }

    
  return (
    <>
    <div>
        <div>
        <Form.Group className="mb-3">
          <div style={{color:"yellow"}}>Question number is automatically increment by 1. Use input box only to reset</div>
        <Form.Control as="input" style={{color: "white", backgroundColor:"green"}} placeholder="You need to enter first question number" htmlSize='5' onChange={e => setQuestionNumber(e.target.value)} />
           <Form.Control as="input" style={{color: "yellow", backgroundColor:"#473626"}} placeholder="Question content" htmlSize='10' onChange={e => setQuestionContent(e.target.value)} />
          <Form.Control as="input" style={{color: "yellow", backgroundColor:"#473626"}} placeholder="Prompt" htmlSize='10' onChange={e => setQuestionPrompt(e.target.value)} />
          <Form.Control as="input" style={{color: "yellow", backgroundColor:"#473626"}} placeholder="Answer Key" htmlSize='10' onChange={e => setQuestionAnswerKey(e.target.value)} />
      </Form.Group>
      <div style={{color:"white"}}>Next question number: {questionnumber}</div>
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