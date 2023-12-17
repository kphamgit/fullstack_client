import React from 'react'
import ButtonSelectQuestionAttempt from './ButtonSelectQA';
import ClozeQuestionAttempt from './ClozeQA';
import WordsScrambler from './WordsScrambler';

function QuestionAttempt({format}) {

  
  //if (question_format == 1) {
    //testFunction
  
  //}
  switch (format) {
    case 1:
      return <ClozeQuestionAttempt />
    case 3:
      return <ButtonSelectQuestionAttempt />
    case 6:
      return <WordsScrambler />
    default:
      return <div>Question Attempt: Question_format error!</div>;
  }
}

export default QuestionAttempt