import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { DeckEntry } from '../types/Deck';

const VOID_BOUNDS = { top: 0, left: 0, width: 0, height: 0 };

export interface FocusedCardState {
  card: DeckEntry | null;
  bounds: { top: number; left: number; width: number; height: number };
}

const initialState: FocusedCardState = {
  card: null,
  bounds: VOID_BOUNDS,
};

export const focusedcardSlice = createSlice({
  name: 'focused-card',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<FocusedCardState>) => {
      state.card = action.payload.card;
      state.bounds = action.payload.bounds;
    },
    clear: (state) => {
      state.card = null;
      state.bounds = VOID_BOUNDS;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set, clear } = focusedcardSlice.actions;

export default focusedcardSlice.reducer;
