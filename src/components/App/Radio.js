import React from "react";
import { useDispatch } from "react-redux";
import { setAnswer } from "../../redux/answer";
import { useSelector } from "react-redux";

export const Radio = ({question}) => {
    const dispatch = useDispatch()
    //const question = useSelector((state) => state.question.value)

    //console.log(" radio question=", question)

  const onOptionChange = (e) => {
    console.log(e.target.value)
    dispatch(setAnswer(e.target.value))
  }
  //${question.radio.choice_1_text}
  return (
    <div>
    <div>
    <p style={{color:'blue'}}>{question.content}</p>
    <input type="radio" value="choice1" name ="choice1" id="choice1" onChange={onOptionChange}/>
    &nbsp;
    {question.radio.choice_1_text && (
    <label htmlFor="choice1">
      {question.radio.choice_1_text}
    </label>
    )}
  </div>
  <div >
    <input type="radio" value="choice2" name ="choice2" id="choice2" onChange={onOptionChange} />
    &nbsp;
    {question.radio.choice_2_text && (
    <label htmlFor="choice2">
      {question.radio.choice_2_text}
    </label>
    )}
  </div>
  <div >
    <input type="radio" value="choice3" name ="choice3" id="choice3" onChange={onOptionChange} />
    &nbsp;
    {question.radio.choice_3_text && (
    <label htmlFor="choice3">
      {question.radio.choice_3_text}
    </label>
    )}
  </div>

  {question.radio.choice_4_text && (
  <div >
    <input type="radio" value="choice4" name ="choice4" id="choice4" onChange={onOptionChange} />
    &nbsp;
    <label htmlFor="choice4">
      {question.radio.choice_4_text}
    </label>
  </div>
  )}
  </div>
  );
};