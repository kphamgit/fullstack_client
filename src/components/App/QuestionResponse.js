import React from 'react'



function QuestionResponse(props) {

  console.log(props.response_content.question_attempt_results)

  return (
    <>
    <div>QuestionResponse</div>
    <div>{props.response_content.question_attempt_results.error_flag.toString()}</div>
    </>
  )
}

export default QuestionResponse