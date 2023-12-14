import React from 'react'
import ButtonSelectQuestionAttempt from './ButtonSelectQA';
import ClozeQuestionAttempt from './ClozeQA';

function QuestionAttempt({question}) {

  console.log(" in question attempt question =",question)
  //if (question_format == 1) {
    //testFunction
  
  //}
  switch (question.format) {
    case 1:
      return <ClozeQuestionAttempt question={question} />
    case 3:
      return <ButtonSelectQuestionAttempt content={question.content }></ButtonSelectQuestionAttempt>
    default:
      return <div>Question Attempt: Question_format error!</div>;
  }
}

export default QuestionAttempt