import React from "react";
import { useDispatch } from "react-redux";
import { setAnswer } from "../../redux/answer";

export const Radio = () => {
    const dispatch = useDispatch()

  const onOptionChange = (e) => {
    console.log(e.target.value)
    dispatch(setAnswer(e.target.value))
  }
  return (
    <div>
    <div>
    <input type="radio" value="choice1" name ="topping" id="flexCheckDefault" onChange={onOptionChange}/>
    &nbsp;
    <label htmlFor="choice1">
      Food
    </label>
  </div>
  <div >
    <input type="radio" value="choice2" name ="topping" id="flexCheckChecked" onChange={onOptionChange} />
    &nbsp;
    <label htmlFor="choic2">
      Animals
    </label>
  </div>
  <div >
    <input type="radio" value="choice3" name ="topping" id="flexCheckChecked" onChange={onOptionChange} />
    &nbsp;
    <label htmlFor="choice3">
      Humans
    </label>
  </div>
  <div >
    <input type="radio" value="choice4" name ="topping" id="flexCheckChecked" onChange={onOptionChange} />
    &nbsp;
    <label htmlFor="choice4">
      Plants
    </label>
  </div>
  </div>
  );
};