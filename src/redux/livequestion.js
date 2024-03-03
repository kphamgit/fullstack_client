//import { faL } from '@fortawesome/free-solid-svg-icons'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const mySlice = createSlice({
  name: 'livequestionreducer',
  initialState,
  reducers: {
    clearQuestion: (state) => {
      state.value = ''
    },
    setLiveQuestion: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { clearQuestion, setLiveQuestion } = mySlice.actions

export default mySlice.reducer