import React, { useEffect } from "react";
import "../styles/App.css";
import LoginPage from "./login/LoginPage";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { RootState } from "../store/reducers";
import Dashboard from "./dashboard/Dashboard";

function App() {
  const user = useSelector((state: RootState) => state.loginSlice.user);
  const history = useHistory();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      history.push("/login");
    }
  }, [history, user]);

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  );
}

export default App;
