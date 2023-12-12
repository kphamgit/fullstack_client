import React from 'react'
import axios from 'axios';
import { useState } from 'react';

function NextButton({questionattempt, childToParent, setHTMLcontent, updatequestionattempt }) {

    const [endofquiz, setEndofquiz] = useState(false)
    const get_next_question = () => {
//var url = '/api/quiz_attempts/' + quiz_attempt_id + '/get_next_question/' + question_id
        var url = 'http://localhost:5000/api/quiz_attempts/' + questionattempt.quizAttemptId + '/get_next_question/' + questionattempt.questionId
        axios.get(url).then((response) => {
            console.log(' Next button... response data=',response.data)
            //res.send({content_html: content_html, question_attempt: question_attempt})
            if (response.data.content_html.indexOf('END') >= 0 ) {
                    setEndofquiz(true)
            }
            else {
                updatequestionattempt(response.data.question_attempt)
                setHTMLcontent(response.data.content_html)
                childToParent(true)
            }
        });
    }
    if (endofquiz) {
        return <h1>END OF QUIZ</h1>
    }
    return (
        <button  onClick={() => get_next_question()}>Next</button>
    )
}

export default NextButton