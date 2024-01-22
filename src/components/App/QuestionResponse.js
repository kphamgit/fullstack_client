import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function displayCorrectAnswer(question, correct_answer) {
  if (question.format === 6 ) {
    let marr = correct_answer.split('/')
    if (question.words_scramble_direction === 'y')
    return (
   <ListGroup>
      {marr.map((item, index) =>  
            (<ListGroup.Item key = {index}>
              { item }
            </ListGroup.Item> 
            )
        )}
    </ListGroup>
    )
    else 
    return (
      <div style = {{color:'blue'}}>
         {marr.map((item, index) =>  
               (<span key = {index}>
                 { item } &nbsp;
               </span>
               )
           )}
       </div>
       )
  }
  else {
    return <div style = {{color:'blue'}}>{correct_answer}</div>
  }
}

function QuestionResponse({response_content}) {

  const question = useSelector((state) => state.question.value)
  //console.log(props.response_content.question_attempt_results)

  return (
    <>
    <div>
    { response_content.question_attempt_results.error_flag ? "Sorry" : "Correct"

     }
     </div>
    
     { 
      response_content.question_attempt_results.error_flag === true &&
      <div>The correct answer is:
         <pre>{displayCorrectAnswer(question, response_content.question_attempt_results.correct_answer) } </pre>
      </div> 
      }
    </>
  )
}

export default QuestionResponse