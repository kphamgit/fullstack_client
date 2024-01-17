import {configureStore} from "@reduxjs/toolkit"
import questionattemptresponseReducer from './attemptResponse.js'
import answerReducer from './answer.js'
import questionReducer from './question.js'
import questionAttemptIdReducer from './question_att_id.js'
import usernameReducer from './username.js'
import tokenReducer from './token.js'
import rootpathReducer from './rootpath.js'
import subcategoryReducer from "./subcategory.js"
import endofquizReducer from "./endofquiz.js"
import userReducer from "./user.js"
import answerarrayReducer from './answerarray.js'
import showquestionattemptReducer from "./showquestionattempt.js"

export default configureStore({
    reducer: {
        username: usernameReducer,
        question_attempt_reponse: questionattemptresponseReducer,
        answer: answerReducer,
        answerarray: answerarrayReducer,
        question: questionReducer,
        question_attempt_id: questionAttemptIdReducer,
        token:tokenReducer,
        rootpath: rootpathReducer,
        subcategory: subcategoryReducer,
        endofquiz: endofquizReducer,
        showquestionattempt: showquestionattemptReducer,
        user: userReducer
    }
})