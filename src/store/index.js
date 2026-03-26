import {configureStore, combineReducers} from '@reduxjs/toolkit';
import modeReducer from './modeSlice';
import {persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistedReducer from 'redux-persist/es/persistReducer';

const rootReducer = combineReducers({

})

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// // const persistReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>{
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           FLUSH,
//           REHYDRATE,
//           PAUSE,
//           PERSIST,
//           PURGE,
//           REGISTER,]
//       }
//     })
//   }
// })

export default configureStore({
  reducer:{ 
    mode: modeReducer,
  }
})

// export const persistor = persistStore(store);
// export default store;