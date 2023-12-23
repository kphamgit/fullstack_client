//import { faL } from '@fortawesome/free-solid-svg-icons'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const mySlice = createSlice({
  name: 'endofquizreducer',
  initialState,
  reducers: {
    setEndOfQuiz: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { clear, setEndOfQuiz } = mySlice.actions

export default mySlice.reducer