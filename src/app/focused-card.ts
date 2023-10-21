import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { DeckEntry } from '../types/Deck';

export interface FocusedCardState {
  card: DeckEntry | null;
}

const initialState: FocusedCardState = {
  card: null,
};

export const focusedcardSlice = createSlice({
  name: 'focused-card',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<DeckEntry>) => {
      state.card = action.payload;
    },
    clear: (state) => {
      state.card = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set, clear } = focusedcardSlice.actions;

export default focusedcardSlice.reducer;
