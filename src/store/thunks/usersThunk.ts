import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../store";
import { setUsers } from "../reducers/usersReducers";
import { mockUsers } from "../mockGlobalData";
import { User } from "../types";

export const getUsers = (): ThunkAction<
  Promise<User[]>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const response = mockUsers;
    dispatch(setUsers(response && response));
    return response;
  } catch (error) {
    throw error;
  }
};
