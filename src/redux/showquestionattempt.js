//import { faL } from '@fortawesome/free-solid-svg-icons'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: true,
}

export const mySlice = createSlice({
  name: 'showquestionattemptreducer',
  initialState,
  reducers: {
    setShowQuestionAttempt: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { clear, setShowQuestionAttempt } = mySlice.actions

export default mySlice.reducer