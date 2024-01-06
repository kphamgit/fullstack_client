import React from 'react'
import WordsScrambler from './WordsScrambler'
import { setAnswer } from '../../redux/answer.js'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css"

function ButtonSelectQuestionAttempt({question}) {

//const question = useSelector((state) => state.question.value)

    const dispatch = useDispatch()
    //content.map((item, index) => {
       // console.log(item)
    //})

    //const answer = useSelector((state) => state.answer.value)

    const update_answer = (answer) => {
        console.log("XXXXXXXXX"+answer)
        dispatch(setAnswer(answer))
    }
    const items = question.content.split('/')

  return (
    <>  
    <ul>
    {items.map(item => 
           
              <Button style={{margin:"5px"}} variant="success" key={item} onClick={() => update_answer(item)}>{item}</Button>
              
      )}
      </ul>
    </>
  )
}

export default ButtonSelectQuestionAttempt