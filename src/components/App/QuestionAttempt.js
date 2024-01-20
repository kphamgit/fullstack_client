import React from 'react'
import ButtonSelectQuestionAttempt from './ButtonSelectQA';
import ClozeQuestionAttempt from './ClozeQA';
import { Radio } from './Radio';
import WordsScrambler from './WordsScrambler';
import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player';
import WordsSelect from './WordsSelect';
import RecordQuestionAttempt from './RecordQA';

function QuestionAttempt() {
  const question = useSelector((state) => state.question.value)

  const renderCurrentQA = () => {
    switch (question.format) {
      case 1:
        return <ClozeQuestionAttempt live_flag={false} />
        case 3:
          return <ButtonSelectQuestionAttempt live_flag={false} />
        case 4: 
            return <Radio live_flag={false} />
        case 6:
          return <WordsScrambler live_flag={false} />
        case 8:
            return <WordsSelect live_flag={false} />
        case 9:
              return <RecordQuestionAttempt />
      default:
        return null
    }
  }

    return (
      <>
      <div>Question: <span>{question.question_number}</span></div>
      <div dangerouslySetInnerHTML={{ __html: question.instruction }}></div>
      <p style={{color:'brown'}}>{question.prompt}</p>
      <div>
      {question.audio_src && <audio src={question.audio_src} controls />}
      </div> 
      {question.video_src && <ReactPlayer url={question.video_src} controls />}
      {  renderCurrentQA(question)  }
      </>
    )
}

export default QuestionAttempt