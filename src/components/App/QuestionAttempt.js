import React from 'react'
import ButtonSelectQuestionAttempt from './ButtonSelectQA';
import ClozeQuestionAttempt from './ClozeQA';
import { Radio } from './Radio';
import WordsScrambler from './WordsScrambler';
import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player';
import WordsSelect from './WordsSelect';
import RecordQuestionAttempt from './RecordQA';

//function QuestionAttempt({quiz_attempt_id, question_attempt_id, toggleShowQuestionAttempt}) {
function QuestionAttempt(props) {
  //console.log(quiz_attempt_id + "ccc"+question_attempt_id)
  const question = useSelector((state) => state.question.value)
  //console.log("UUUUUUUUUUUU",question)
 
  const renderCurrentQA = (question) => {
    switch (question.format) {
      case 1:
        return <ClozeQuestionAttempt question_format = {1} {...props} />
      case 3:
        return <ButtonSelectQuestionAttempt question_format = {3} {...props} />
      case 4: 
          return <Radio  question_format = {4} {...props}/>
      case 6:
        return <WordsScrambler question_format = {6} {...props} />
      case 8:
          return <WordsSelect question_format = {8} {...props} />
      case 9:
            return <RecordQuestionAttempt question_format = {9} {...props}  />
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