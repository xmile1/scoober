import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryItem } from '@/common/models/room';

interface HistoryState {
  history: HistoryItem[];
  firstNumber: number;
}

type SetHistoryItem = {
  selectedNumber: number;
  number: number;
  user: string;
}

const initialState: HistoryState = {
  history: [],
  firstNumber: 0,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistoryItem(state, action: PayloadAction<SetHistoryItem>) {

      const { selectedNumber, number, user } = action.payload;
      const lastResult = state.history.at(-1)?.result ?? state.firstNumber;
      const newHistoryItem: HistoryItem = {
        selectedNumber,
        number: lastResult,
        result: number,
        user,
        id: Math.random().toString(16).substring(2, 8),
      };
      state.history = [...state.history, newHistoryItem];
    },
    resetHistory(state) {
      state.history = [];
    },
    setFirstNumber(state, action: PayloadAction<number>) {
      state.firstNumber = action.payload;
    },
  },
});

export const { setHistoryItem, resetHistory, setFirstNumber } = historySlice.actions;
export default historySlice.reducer;
