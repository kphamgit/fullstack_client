import React from 'react'
import WordsScrambler from './WordsScrambler'
import { setAnswer } from '../../redux/answer.js'
import { useDispatch, useSelector } from 'react-redux'

function ButtonSelectQuestionAttempt() {

const question = useSelector((state) => state.question.value)

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
    <div>ButtonSelectQuestionAttempt</div>
    <div>{question.content}</div>
    <ul>
    {items.map(item => 
             <li key={item}>
              <button onClick={() => update_answer(item)}>{item}</button>
              </li>
      )}
      </ul>
    </>
  )
}

export default ButtonSelectQuestionAttempt