import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../store";
import { setUsers } from "../reducers/usersReducers";
import { mockRoles, mockUsers } from "../mockGlobalData";
import { Role, User } from "../types";
import { setRoles } from "../reducers/rolesReducers";

export const getRoles = (): ThunkAction<
  Promise<Role[]>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const response = mockRoles;
    dispatch(setRoles(response && response));
    return response;
  } catch (error) {
    throw error;
  }
};
