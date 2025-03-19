import { configureStore } from '@reduxjs/toolkit'
import schoolReducer from '../features/school/schoolSlice'
import userReducer from '../features/user/userSlice'


export default configureStore({
  reducer: {
    school: schoolReducer,
    user: userReducer
  }
})