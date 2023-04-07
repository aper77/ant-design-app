import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser, setError, setLoading } from "../reducers/loginReducers";
import { User } from "../types";
import { mockUsers } from "../mockGlobalData";
import Cookies from "js-cookie";
import jwt from "jwt-simple";
import { setUserConfigsData } from "../reducers/userConfigsReducers";

const secret = "mysecretkey";

function findUser(username: string, password: string): User | undefined {
  return mockUsers.find(
    (user) => user.username === username && user.password === password
  );
}

export const login = createAsyncThunk(
  "login/loginUser",
  async (
    { username, password }: { username: string; password: string },
    { dispatch }
  ) => {
    dispatch(setLoading(true));
    try {
      const user = findUser(username, password);
      // Simulate delay with setTimeout for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (user) {
        const token = jwt.encode(user, secret);
        Cookies.set("token", token);
        dispatch(setUser(user));
        if (user && user.userConfigs) {
          dispatch(setUserConfigsData(user.userConfigs));
        }
        return user;
      } else {
        dispatch(setError("Invalid username or password."));
        return null;
      }
    } catch (error:any) {
      dispatch(setError(error.message));
      throw new Error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);
