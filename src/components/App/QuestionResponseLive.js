import React from 'react'
import { useSelector } from 'react-redux'


function QuestionResponseLive({response_content}) {
  const question = useSelector((state) => state.live_question.value)
  //if (question.format === 6 )
  return (
    <>
    <div>
    {response_content.error_flag ? "Sorry" : "Correct" }
     </div>
     { response_content.error_flag &&
      <div>The correct answer is:
         <pre>{response_content.correct_answer} </pre>
      </div> }
    </>
    
  )
}

export default QuestionResponseLive