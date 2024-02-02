import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authSlice from './slice/auth.slice'
import userSlice from './slice/user.slice'
import loaderSlice from './slice/loader.slice'

const rootReducer = combineReducers({
    authSlice,
    userSlice,
    loaderSlice,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store