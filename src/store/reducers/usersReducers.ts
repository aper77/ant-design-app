import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

interface UsersState {
  users: User[];
}

const initialStateConfigs: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialStateConfigs,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    editUser: (state, action: PayloadAction<User>) => {
      const { id } = action.payload;
      const index = state.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const { setUsers, addUser, deleteUser, editUser } = usersSlice.actions;
export default usersSlice.reducer;
