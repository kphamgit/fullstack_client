import React from 'react'



function QuestionResponseLive({response_content}) {

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