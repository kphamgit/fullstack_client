import {configureStore} from "@reduxjs/toolkit"
import athomeflagReducer from './athome.js'
import questionattemptresponseReducer from './attemptResponse.js'
import answerReducer from './answer.js'
import questionReducer from './question.js'
import questionAttemptIdReducer from './question_att_id.js'
import usernameReducer from './username.js'
import tokenReducer from './token.js'
import rootpathReducer from './rootpath.js'
import subcategoryReducer from "./subcategory.js"

export default configureStore({
    reducer: {
        username: usernameReducer,
        athomeflag: athomeflagReducer,
        question_attempt_reponse: questionattemptresponseReducer,
        answer: answerReducer,
        question: questionReducer,
        question_attempt_id: questionAttemptIdReducer,
        token:tokenReducer,
        rootpath: rootpathReducer,
        subcategory: subcategoryReducer
    }
})