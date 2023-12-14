//import { faL } from '@fortawesome/free-solid-svg-icons'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const mySlice = createSlice({
  name: 'questionreducer',
  initialState,
  reducers: {
    clear: (state) => {
      state.value = ''
    },
    setValue: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { clear, setValue } = mySlice.actions

export default mySlice.reducer