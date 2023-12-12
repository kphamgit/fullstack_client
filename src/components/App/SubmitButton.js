import React from 'react'
import axios from 'axios'

function SubmitButton({questionattempt, childToParent}) {
    
    const process_question_attempt = () => {
        console.log("in process question atempt questionattempt = ", questionattempt)
        var url = 'http://localhost:5000/api/question_attempts/' + questionattempt.id + '/process_attempt'
        axios.post(url,{user_answer: "am"}
            ).then((response) => {
            console.log(' Submit... response data=',response.data)
            //{user_answer: user_answer}
            //console.log("5) in QuizAtt response data = ", response.data)
            childToParent(false)
          });
        
    }

  return (
    <button  onClick={() => process_question_attempt()}>Submit</button>
  )
}

export default SubmitButton