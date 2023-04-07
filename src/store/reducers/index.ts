import { combineReducers } from "@reduxjs/toolkit";
import { loginSlice } from "./loginReducers";
import { marketsSlice } from "./marketsReducers";
import { userConfigsSlice } from "./userConfigsReducers";
import { usersSlice } from "./usersReducers";
import { rolesSlice } from "./rolesReducers";

const rootReducer = combineReducers({
  loginSlice: loginSlice.reducer,
  userConfigsSlice: userConfigsSlice.reducer,
  marketsSlice: marketsSlice.reducer,
  usersSlice: usersSlice.reducer,
  rolesSlice: rolesSlice.reducer,
  // ...any other reducers you have
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
