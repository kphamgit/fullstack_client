import React, { useEffect } from 'react'
import ButtonSelectQuestionAttempt from './ButtonSelectQA';
import ClozeQuestionAttempt from './ClozeQA';
import { Radio } from './Radio';
import WordsScrambler from './WordsScrambler';
import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player';
import WordsSelect from './WordsSelect';

function QuestionAttempt() {

  const question = useSelector((state) => state.question.value)
 
  const renderCurrentQA = (question) => {
    switch (question.format) {
      case 1:
        return <ClozeQuestionAttempt question={question} />
      case 3:
        return <ButtonSelectQuestionAttempt question={question}  />
      case 4:
          return <Radio  question={question} />
      case 6:
        return <WordsScrambler question={question} />
      case 8:
          return <WordsSelect question={question} />
      default:
        return null
    }
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: question.instruction }}></div>
      <p style={{color:'brown'}}>{question.prompt}</p>
      
      <div>
      {question.audio_src && <audio src={question.audio_src} controls />}
      </div> 
      {question.video_src && <ReactPlayer url={question.video_src} controls />}
      { question &&
        <>
        {  renderCurrentQA(question)  }
         </>
      }

    </div>
  )
}

export default QuestionAttempt