import React, { Dispatch, useState } from "react";
import Login from "./Login";
import "../../styles/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Loading from "../customComponents/Loading";
import { login } from "../../store/thunks/loginThunk";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  // Use the useSelector hook to get the login status and errors
  const loginStatus = useSelector(
    (state: RootState) => state.loginSlice.loading
  );
  const loginError = useSelector((state: RootState) => state.loginSlice.error);

  const handleLogin = (values: { username: string; password: string }) => {
    // Send a login request to the server
    dispatch(login({ username: values.username, password: values.password }));
  };

  return (
    <>
      {/* Show the loading spinner if the login status is 'LOADING' */}
      {loginStatus ? (
        <Loading />
      ) : (
        <div className="container">
          {/* Pass the login error to the Login component */}
          <Login onFinish={handleLogin} error={loginError} />
        </div>
      )}
    </>
  );
};

export default LoginPage;
