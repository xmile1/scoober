import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Room } from "@/common/models/room";

interface RoomsState {
  rooms: Room[];
  currentRoom: Room | null;
}

export const roomsSlice = createSlice({
  name: 'rooms',

  initialState: {
    rooms: [],
    currentRoom: null,
  } as RoomsState,

  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    },
    setCurrentRoom: (state, action: PayloadAction<Room | null>) => {
      state.currentRoom = action.payload;
    },
  },
})

export const { setRooms, setCurrentRoom } = roomsSlice.actions

export default roomsSlice.reducer
