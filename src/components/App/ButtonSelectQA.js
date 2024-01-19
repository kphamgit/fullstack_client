import React from 'react'
import { setAnswer } from '../../redux/answer.js'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css"
import SubmitButton from './SubmitButton.js'

function ButtonSelectQuestionAttempt(live_flag) {

    //const question = useSelector((state) => state.question.value)
    const question = useSelector(state => {
      if (live_flag)
          return state.live_question.value
      else {
          return state.question.value
      }
   })

    const dispatch = useDispatch()

    const update_answer = (answer) => {
        //console.log("XXXXXXXXX"+answer)
        dispatch(setAnswer(answer))
    }
    const items = question.content.split('/')

  return (
    <>  
    <ul>
    {items.map(item => 
            <Button style={{margin:"5px"}} variant="primary" key={item} onClick={() => update_answer(item)}>{item}</Button>
      )}
      </ul>
      { !live_flag && 
      <div><SubmitButton
        question_format={3}
    /></div>
      }
    
    </>
  )
}

export default ButtonSelectQuestionAttempt