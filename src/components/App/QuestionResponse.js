import React from 'react'



function QuestionResponse(props) {

  //console.log(props.response_content.question_attempt_results)

  return (
    <>
    <div>
    { props.response_content.question_attempt_results.error_flag ? "Sorry" : "Correct"

     }
     </div>
    
     { 
      props.response_content.question_attempt_results.error_flag === true &&
      <div>The correct answer is:
         <pre>{props.response_content.question_attempt_results.correct_answer} </pre>
      </div> 
      }
    </>
  )
}

export default QuestionResponse