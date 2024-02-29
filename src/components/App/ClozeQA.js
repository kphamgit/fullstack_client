import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SubmitButton from './SubmitButton'
import format_cloze_question_content from './formatClozeQuestion'

function ClozeQuestionAttempt({live_flag}) {
    //console.log(" in ClozeQuestionAttempt")
    const question = useSelector(state => {
      if(live_flag) {
        
          return state.live_question.value
      }
      else {
          return state.question.value
      }
   })
    const [clozehtml, setClozehmtl] = useState('')

    useEffect( () => {
        //console.log(" in useEffect quesiton=",question)
        //console.log("QQQQQQQQQQQQQQQQQQQQQQUUUUUUUUUUU",question)
        const question_html = format_cloze_question_content(question)
        //console.log("EEEEEEEEEEEEEEEEEE", question_html)
        //let els = document.getElementsByClassName('cloze_answer')
        document.querySelectorAll('.cloze_answer').forEach( (x) => { x.value = '' } )
        setClozehmtl(question_html)
    },[question ])
    
  return (
    <>
    <pre></pre>
    <div  dangerouslySetInnerHTML={{ __html: clozehtml }}></div>
    {!live_flag && 
    <div><SubmitButton
         question_format={1}
    /></div>}
    </>
  )
}

export default ClozeQuestionAttempt