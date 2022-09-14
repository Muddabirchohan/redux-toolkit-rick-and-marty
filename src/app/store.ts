import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import playerSlice from '../features/players/playerSlice';
import themeSlice from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    players: playerSlice,
    theme: themeSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
