import { combineReducers, configureStore } from '@reduxjs/toolkit'

import roomsReducer from './roomsSlice'
import playerStateReducer from './playerStateSlice'
import historyReducer from './historySlice'

const rootReducer = combineReducers({
  rooms: roomsReducer,
  playerState: playerStateReducer,
  history: historyReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

