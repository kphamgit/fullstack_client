import React from 'react'
import WordsScrambler from './WordsScrambler'
import { setAnswer } from '../../redux/answer.js'
import { useDispatch } from 'react-redux'

function ButtonSelectQuestionAttempt({content}) {
console.log("XXXXXXXXXXXXXXXX",content)
    const dispatch = useDispatch()
    //content.map((item, index) => {
       // console.log(item)
    //})

    //const answer = useSelector((state) => state.answer.value)

    const update_answer = (answer) => {
        console.log("XXXXXXXXX"+answer)
        dispatch(setAnswer(answer))
    }
    const items = content.split('/')

  return (
    <>
    <div>ButtonSelectQuestionAttempt</div>
    <div>{content}</div>
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