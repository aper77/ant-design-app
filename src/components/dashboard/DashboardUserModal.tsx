import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { RootState } from "../../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/Dashboard.css";
import { User } from "../../store/types";
import { setUser } from "../../store/reducers/loginReducers";
import CustomUserEdite from "../customComponents/CustomUserEdite";

interface DashboardUserModalProps {
  isModalVisible: {
    title: string;
    isOpen: boolean;
  };
  user: User | null;
  onCloseModal: () => void;
}

const DashboardUserModal: React.FC<DashboardUserModalProps> = ({
  isModalVisible,
  onCloseModal,
  user,
}) => {
  const [modifiedUser, setModifiedUser] = useState<User | null>(user);
  const dispatch = useDispatch();

  useEffect(() => {
    setModifiedUser(user);
  }, [user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
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

  const handleSaveClick = () => {
    if (modifiedUser !== null) {
      dispatch(setUser(modifiedUser));
      onCloseModal();
    }
  };

  return (
    <Modal
      title={isModalVisible.title}
      visible={isModalVisible.isOpen}
      onCancel={onCloseModal}
      footer={[
        <Button type="primary" danger onClick={onCloseModal}>
          Cancel
        </Button>,
        <Button
          type="primary"
          style={{ backgroundColor: "green", borderColor: "green" }}
          onClick={handleSaveClick}
        >
          Save
        </Button>,
      ]}
    >
      {modifiedUser && (
        <CustomUserEdite
          user={modifiedUser}
          onInputChange={handleInputChange}
          validateStatus={!modifiedUser.username ? "error" : "success"}
        />
      )}
    </Modal>
  );
};

export default DashboardUserModal;
