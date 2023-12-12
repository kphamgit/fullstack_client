import {configureStore} from "@reduxjs/toolkit"
import athomeflagReducer from './athome.js'
import questionattemptresponseReducer from './attemptResponse.js'

export default configureStore({
    reducer: {
        athomeflag: athomeflagReducer,
        question_attempt_reponse: questionattemptresponseReducer
    }
})