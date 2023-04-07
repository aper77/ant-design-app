import React, { useEffect, useState } from "react";
import "../../../styles/User.css";
import { Button, Divider, Modal, Table } from "antd";
import AddUserForm from "./AddUserForm";
import { User } from "../../../store/types";
import { useDispatch, useSelector } from "react-redux";
import "../../../styles/Markets.css";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../../store/store";
import { getUsers } from "../../../store/thunks/usersThunk";
import {
  addUser,
  deleteUser,
  editUser,
} from "../../../store/reducers/usersReducers";
import columns from "./config";
import CustomUserEdite from "../../customComponents/CustomUserEdite";

const UsersPage: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const users = useSelector((state: RootState) => state.usersSlice.users);
  const [localUsers, setLocalUsers] = useState<User[]>(users);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modifiedUser, setModifiedUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleDelete = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const addUserFunc = (newUser: User) => {
    dispatch(addUser(newUser));
  };

  const openEditModal = (userId: string) => {
    const user = localUsers.find((user) => user.id === userId);
    if (user) {
      setEditingUser(user);
      setIsModalVisible(true);
    }
  };

  const handleSave = () => {
    if (modifiedUser !== null) {
      dispatch(editUser(modifiedUser));
    }
    setIsModalVisible(false);
  };

  const onClose = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setModifiedUser(editingUser);
    setModifiedUser((prevUser) => {
      if (prevUser === null) {
        return null;
      }
      return {
        ...prevUser,
        [id]: value,
      };
    });
  };

  return (
    <div>
      <AddUserForm addUser={(newUser) => addUserFunc(newUser)} />
      <Divider style={{ backgroundColor: "#1677ff" }} />
      <Table
        dataSource={localUsers && localUsers}
        columns={columns(handleDelete, openEditModal)}
        rowKey={(record: User) => record.id}
        pagination={false}
      />
      <Modal
        title={`Edit user ${editingUser &&
          editingUser.name + " " + editingUser.surname}`}
        visible={isModalVisible}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        {editingUser && (
          <CustomUserEdite
            user={editingUser}
            onInputChange={handleInputChange}
            validateStatus={!editingUser.username ? "error" : "success"}
          />
        )}{" "}
      </Modal>
    </div>
  );
};

export default UsersPage;
