import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { User } from "../../../store/types";

interface AddUserForm {
  addUser: (user: User) => void;
}

const AddUserForm: React.FC<AddUserForm> = ({ addUser }) => {
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    password: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    userConfigs: null,
    role: {
      name: "",
      permissions: [],
    },
  });

  // Handle role selection change
  const handleRoleChange = (value: string) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      role: {
        name: value,
        permissions: [],
      },
    }));
  };

  // Handle form input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser: any) => ({ ...prevUser, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const newKey = Math.floor(Math.random() * 10000) + 1;
    const newUser = { ...user, id: newKey.toString() };
    addUser(newUser);
    setUser({
      id: "",
      username: "",
      password: "",
      name: "",
      surname: "",
      email: "",
      phone: "",
      userConfigs: null,
      role: {
        name: "",
        permissions: [],
      },
    });
  };

  return (
    <Form layout="inline" onFinish={handleSubmit}>
      <Form.Item label="Username" style={{ margin: "20px" }}>
        <Input
          required
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item label="Password" style={{ margin: "20px" }}>
        <Input.Password
          required
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item label="Name" style={{ margin: "20px" }}>
        <Input name="name" value={user.name} onChange={handleInputChange} />
      </Form.Item>
      <Form.Item label="Surname" style={{ margin: "20px" }}>
        <Input
          name="surname"
          value={user.surname}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item label="Email" style={{ margin: "20px", marginLeft: "50px" }}>
        <Input
          required
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item label="Phone" style={{ margin: "20px", marginLeft: "43px" }}>
        <Input
          style={{ width: 200 }}
          name="phone"
          value={user.phone}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: "Please select a role" }]}
        style={{ margin: "20px", marginLeft: "18px" }}
      >
        <Select
          style={{ width: 180 }}
          onChange={handleRoleChange}
          value={user.role.name}
        >
          <Select.Option
            style={{
              backgroundColor: "red",
              height: "30px",
              borderRadius: "15px",
              textAlign: "center",
              paddingTop: "4px",
              color: "white",
              margin: "5px",
            }}
            value="Admin"
          >
            Admin
          </Select.Option>
          <Select.Option
            style={{
              backgroundColor: "#1976ff",
              height: "30px",
              borderRadius: "15px",
              textAlign: "center",
              paddingTop: "4px",
              color: "white",
              margin: "5px",
            }}
            value="Manager"
          >
            Manager
          </Select.Option>
          <Select.Option
            style={{
              backgroundColor: "green",
              height: "30px",
              borderRadius: "15px",
              textAlign: "center",
              paddingTop: "4px",
              color: "white",
              margin: "5px",
            }}
            value="Guest"
          >
            Guest
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item style={{ margin: "20px", marginLeft: "110px" }}>
        <Button style={{ width: 150 }} type="primary" htmlType="submit">
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUserForm;
