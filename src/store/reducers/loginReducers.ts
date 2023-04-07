import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "../thunks/loginThunk";
import { User } from "../types";

interface LoginState {
  user: User | null;
  error: string | null;
  loading: boolean;
}

const initialState: LoginState = {
  user: null,
  error: null,
  loading: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
      state.loading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, setError, setLoading } = loginSlice.actions;

export default loginSlice.reducer;
