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
    },
    bookmarkSchool: (state, action) => {
      const schoolId = action.payload;
      const school = state.value.find(s => s._id === schoolId);
      if (school) {
        school.bookmarked = !school.bookmarked; // Toggle bookmarked status
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { loadSchools, removeSchools, bookmarkSchool  } = schoolSlice.actions

export default schoolSlice.reducer