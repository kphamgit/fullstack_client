//import { faL } from '@fortawesome/free-solid-svg-icons'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const mySlice = createSlice({
  name: 'livequestionreducer',
  initialState,
  reducers: {
    clear: (state) => {
      state.value = ''
    },
    setLiveQuestion: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { clear, setLiveQuestion } = mySlice.actions

export default mySlice.reducer