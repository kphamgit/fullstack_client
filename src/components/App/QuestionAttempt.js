import React from 'react'
import ButtonSelectQuestionAttempt from './ButtonSelectQA';
import ClozeQuestionAttempt from './ClozeQA';
import WordsScrambler from './WordsScrambler';
import { useSelector } from 'react-redux'

function QuestionAttempt({format}) {

  const question = useSelector((state) => state.question.value)

  return (
    <div className="App">
      <h2>{question.prompt}</h2>

      {(() => {
        switch (format) {
          case 1:
            return <ClozeQuestionAttempt />
          case 2:
            return <ButtonSelectQuestionAttempt />
          case 3:
            return <WordsScrambler />
          default:
            return null
        }
      })()}

    </div>
  )
/*
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
  */
}

export default QuestionAttempt