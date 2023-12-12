import React from 'react'

function QuestionAttempt(props) {
  return (
    <>
    <div>QuestionAttempt</div>
    <div dangerouslySetInnerHTML={{ __html: props.myhtml }}></div>
    </>
  )
}

export default QuestionAttempt