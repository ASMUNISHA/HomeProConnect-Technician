import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from "../Reducer";


// export const Store =  configureStore({
//   reducer,
//   middleware :[...getDefaultMiddleware({thunk:false})] 
// })



const Store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Set to false if not using thunk middleware
      serializableCheck: false, // Set to false if needed to disable serializable check
    }),
});

export default Store;