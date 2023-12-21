import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'

console.log("From store.js. Contacting middleware");

export const store = configureStore({
  
  reducer: {user: userReducer},
  
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware({
    
    serializableCheck: false,
  }),
})