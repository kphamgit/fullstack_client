import React from 'react'
import ButtonSelectQuestionAttempt from './ButtonSelectQA';
import ClozeQuestionAttempt from './ClozeQA';
import { Radio } from './Radio';
import WordsScrambler from './WordsScrambler';
import { useSelector } from 'react-redux'

function QuestionAttempt({format}) {

  //console.log(" xxxxxxxxxxxxxxx"+format)
  const question = useSelector((state) => state.question.value)

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: question.instruction }}></div>
      <p style={{color:'brown'}}>{question.prompt}</p>

      {(() => {
        switch (format) {
          case 1:
            return <ClozeQuestionAttempt />
          case 3:
            return <ButtonSelectQuestionAttempt />
          case 4:
              return <Radio />
          case 6:
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