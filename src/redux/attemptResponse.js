import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "question attempt response",
}

export const mySlice = createSlice({
  name: 'question_attempt_reponse',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setValue } = mySlice.actions

export default mySlice.reducer