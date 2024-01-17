import React from 'react'
import { setAnswer } from '../../redux/answer.js'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css"
import SubmitButton from './SubmitButton.js'

function ButtonSelectQuestionAttempt(props) {

    const question = useSelector((state) => state.question.value)

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

      <div><SubmitButton
        {...props}
    /></div>
    
    </>
  )
}

export default ButtonSelectQuestionAttempt