//import { faL } from '@fortawesome/free-solid-svg-icons'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: true,
}

export const mySlice = createSlice({
  name: 'athomereducer',
  initialState,
  reducers: {
    turn_on: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    turn_off: (state) => {
      state.value = false
    },
 
  },
})

// Action creators are generated for each case reducer function
export const { turn_on, turn_off } = mySlice.actions

export default mySlice.reducer