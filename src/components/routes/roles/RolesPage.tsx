import React, { useEffect } from "react";
import RolesAccordion from "./RolesAccordion";
import { Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../../store/store";
import { getRoles } from "../../../store/thunks/rolesThunk";

const RolesPage: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const roles = useSelector((state: RootState) => state.rolesSlice.roles);
  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);
  return (
    <div className="">
      <h1>Role Page</h1>
      <Divider style={{ backgroundColor: "#1677ff" }} />
      <RolesAccordion roles={roles} />
    </div>
  );
};

export default RolesPage;
