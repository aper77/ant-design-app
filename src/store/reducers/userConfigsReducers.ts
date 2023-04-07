import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserConfigs } from "../types";

interface UserConfigsState {
  userConfigsData: UserConfigs | null;
}

const initialStateConfigs: UserConfigsState = {
  userConfigsData: null,
};

export const userConfigsSlice = createSlice({
  name: "userConfigs",
  initialState: initialStateConfigs,
  reducers: {
    setUserConfigsData: (state, action: PayloadAction<UserConfigs>) => {
      state.userConfigsData = action.payload;
    },
  },
});

export const { setUserConfigsData } = userConfigsSlice.actions;
export default userConfigsSlice.reducer;
