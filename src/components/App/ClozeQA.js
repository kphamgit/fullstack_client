import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SubmitButton from './SubmitButton'
import format_cloze_question_content from './formatClozeQuestion'

function ClozeQuestionAttempt({live_flag}) {
    const question = useSelector((state) => state.question.value)
    const [clozehtml, setClozehmtl] = useState('')
    useEffect( () => {
            setClozehmtl(format_cloze_question_content(question))
    },[question ])
    
  return (
    <>
    <pre></pre>
    <div dangerouslySetInnerHTML={{ __html: clozehtml }}></div>
    {!live_flag && 
    <div><SubmitButton
         question_format={1}
    /></div>}
    </>
  )
}

export default ClozeQuestionAttempt