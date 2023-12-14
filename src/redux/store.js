import {configureStore} from "@reduxjs/toolkit"
import athomeflagReducer from './athome.js'
import questionattemptresponseReducer from './attemptResponse.js'
import answerReducer from './answer.js'
import questionReducer from './question.js'
import questionAttemptIdReducer from './question_att_id.js'

export default configureStore({
    reducer: {
        athomeflag: athomeflagReducer,
        question_attempt_reponse: questionattemptresponseReducer,
        answer: answerReducer,
        question: questionReducer,
        question_attempt_id: questionAttemptIdReducer
    }
})