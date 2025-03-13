import { createSlice } from '@reduxjs/toolkit'

export const schoolSlice = createSlice({
  name: 'school',
  initialState: {
    value: []
  },
  reducers: {
    loadSchools: (state, data) => {
      state.value.push(...data.payload)
    },
    removeSchools: state => {
      state.value = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { loadSchools, removeSchools } = schoolSlice.actions

export default schoolSlice.reducer