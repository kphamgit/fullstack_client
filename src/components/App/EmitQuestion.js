import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { SocketContext } from './Home';
import question from '../../redux/question';
import EmitLiveQuestion from './EmitLiveQuestion';
import EmitQuizQuestion from './EmitQuizQuestion';

function EmitQuestion() {
  const [questionsource, setQuestionSource] = useState('quiz')
  const socket = useContext(SocketContext);
  
  function resetScoreBoard() {
    socket.emit("reset_scoreboard")
  }
  
  return (
    <>
    <div style={{width:"20%"}}>
    <Form.Select aria-label="Default select example" value={questionsource} 
    onChange={(e) => setQuestionSource(e.currentTarget.value)}
    >
      <option value="quiz">Quiz</option>
      <option value="live">Live</option>
    </Form.Select>
    </div>
    <div>
    { questionsource === "quiz" ?   
      <EmitQuizQuestion />
      :
      <EmitLiveQuestion />
    }
    </div>
    <div>
    <Button variant="success" onClick={resetScoreBoard}>Reset Score</Button>
    </div>
    </>
  )
}

export default EmitQuestion