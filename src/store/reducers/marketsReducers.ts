import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Markets } from "../types";

interface MarketsState {
  marketsData: Array<Markets> | null;
}

const marketsInitialState: MarketsState = {
  marketsData: null,
};

export const marketsSlice = createSlice({
  name: "markets",
  initialState: marketsInitialState,
  reducers: {
    setMarkets: (state, action: PayloadAction<Array<Markets>>) => {
      state.marketsData = action.payload;
    },
  },
});

export const { setMarkets } = marketsSlice.actions;
export default marketsSlice.reducer;
