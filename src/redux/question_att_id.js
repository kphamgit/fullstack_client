//import { faL } from '@fortawesome/free-solid-svg-icons'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const mySlice = createSlice({
  name: 'questionattemptidreducer',
  initialState,
  reducers: {
    setQuestionAttemptId: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setQuestionAttemptId } = mySlice.actions

export default mySlice.reducer