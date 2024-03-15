import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlayerState {
  username: string;
  isMyTurn: boolean;
  opponentName: string;
}

export const playerStateSlice = createSlice({
  name: 'playerState',
  initialState: {
    username: "",
    isMyTurn: false,
    opponentName: "",
  } as PlayerState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setIsMyTurn: (state, action: PayloadAction<boolean>) => {
      state.isMyTurn = action.payload;
    },
    setOpponentName: (state, action: PayloadAction<string>) => {
      state.opponentName = action.payload;
    },
  },
})

export const { setUsername, setIsMyTurn, setOpponentName } = playerStateSlice.actions

export default playerStateSlice.reducer
