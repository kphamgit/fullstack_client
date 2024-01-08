import React from "react";
import { useDispatch } from "react-redux";
import { setAnswer } from "../../redux/answer";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import Form from 'react-bootstrap/Form';

export const Radio = ({question}) => {
    const dispatch = useDispatch()
    const [selectedOption, setSelectedOption] = useState('option1')
    const [topping, setTopping] = useState("Medium")

  const onOptionChange = (e) => {
    dispatch(setAnswer(e.target.value))
  }
  //${question.radio.choice_1_text}
  return (
    <>
    <div>{question.content}</div>
    <br />
    <Form>
      {['radio'].map((type) => (
        <div key={`${type}`} className="mb-3">
          <Form.Check
            label={question.radio.choice_1_text}
            name="choice"
            value="choice1"
            type={type}
            id={`${type}-1`}
            onChange={onOptionChange}
          />
          <Form.Check
            label={question.radio.choice_2_text}
            name="choice"
            value="choice2"
            type={type}
            id={`${type}-2`}
            onChange={onOptionChange}
          />
            <Form.Check
            label={question.radio.choice_3_text}
            name="choice"
            value="choice3"
            type={type}
            id={`${type}-2`}
            onChange={onOptionChange}
          />
          {question.radio.choice_4_text && (
          <Form.Check
            label={question.radio.choice_4_text}
            name="choice"
            value="choice4"
            type={type}
            id={`${type}-3`}
            onChange={onOptionChange}
          />
          )}
        </div>
      ))}
    </Form>
    </>
  );
};