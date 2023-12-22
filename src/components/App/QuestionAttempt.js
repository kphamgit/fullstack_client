import React, { useEffect } from 'react'
import ButtonSelectQuestionAttempt from './ButtonSelectQA';
import ClozeQuestionAttempt from './ClozeQA';
import { Radio } from './Radio';
import WordsScrambler from './WordsScrambler';
import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player';

function QuestionAttempt({format}) {

 
  const question = useSelector((state) => state.question.value)
 
  return (
    <div>
  
      <div dangerouslySetInnerHTML={{ __html: question.instruction }}></div>
      <p style={{color:'brown'}}>{question.prompt}</p>
      <div>
      {question.audio_src && <audio src={question.audio_src} controls />}
      </div> 
      {question.video_src && <ReactPlayer url={question.video_src} controls />}

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