//import { faL } from '@fortawesome/free-solid-svg-icons'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const mySlice = createSlice({
  name: 'studentscores',
  initialState,
  reducers: {
    clearStudentScores: (state) => {
      state.value = []
    },
    setStudentScores: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { clearStudentScores, setStudentScores } = mySlice.actions

export default mySlice.reducer