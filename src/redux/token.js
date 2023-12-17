//import { faL } from '@fortawesome/free-solid-svg-icons'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const mySlice = createSlice({
  name: 'tokenreducer',
  initialState,
  reducers: {
    clear: (state) => {
      state.value = ''
    },
    setTokenValue: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { clear, setTokenValue } = mySlice.actions

export default mySlice.reducer