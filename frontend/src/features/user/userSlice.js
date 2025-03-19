import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: null
  },
  reducers: {
    setUser: (state, data) => {
      state.value = data
    },
    removeUser: state => {
      state.value = null
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser  } = userSlice.actions

export default userSlice.reducer