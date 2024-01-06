//import { faL } from '@fortawesome/free-solid-svg-icons'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const mySlice = createSlice({
  name: 'answerarrayreducer',
  initialState,
  reducers: {
    clearAnswerArray: (state) => {
      state.value = []
    },
    setAnswerArray: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { clearAnswerArray, setAnswerArray } = mySlice.actions

export default mySlice.reducer