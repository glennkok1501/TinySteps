import { configureStore } from '@reduxjs/toolkit'
import schoolReducer from '../features/school/schoolSlice'

export default configureStore({
  reducer: {
    school: schoolReducer
  }
})