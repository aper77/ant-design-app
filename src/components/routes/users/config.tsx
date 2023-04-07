import React from "react";
import { ColumnType } from "antd/lib/table";
import { Button } from "antd";
import { User } from "../../../store/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "../../../styles/User.css";

type Props = {
  handleDelete: (userId: string) => void;
  handleEdit: (record: string) => void;
};

const columns = (
  handleDelete: Props["handleDelete"],
  handleEdit: Props["handleEdit"]
): ColumnType<User>[] => [
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (role) => (
      <div
        style={{
          backgroundColor: getRoleColor(role.name),
          width: "100px",
          height: "30px",
          borderRadius: "15px",
          textAlign: "center",
          paddingTop: "4px",
          color: "white",
        }}
      >
        {role.name}
      </div>
    ),
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
    render: () => "********",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a: User, b: User) => a.name.localeCompare(b.name),
  },
  {
    title: "Surname",
    dataIndex: "surname",
    key: "surname",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Actions",
    key: "actions",
    render: (record: User) => (
      <>
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        >
          Delete
        </Button>
        <Button
          ghost
          style={{ background: "green", borderColor: "green", marginLeft: 50 }}
          icon={<EditOutlined />}
          onClick={() => handleEdit(record.id)}
        >
          Edit
        </Button>
      </>
    ),
  },
];

function getRoleColor(role: string) {
  switch (role) {
    case "Admin":
      return "red";
    case "Manager":
      return "#1976ff";
    case "Guest":
      return "green";
    default:
      return "black";
  }
}

export default columns;
