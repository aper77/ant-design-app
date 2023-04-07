import React, { useState, useEffect } from "react";
import { Card, Form, Input, Space } from "antd";
import { User } from "../../store/types";

interface CustomUserEditProps {
  user: User | null;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateStatus?:
    | ""
    | "error"
    | "success"
    | "warning"
    | "validating"
    | undefined;
}

const CustomUserEdit: React.FC<CustomUserEditProps> = ({
  user,
  onInputChange,
  validateStatus,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, form]);

  return (
    <Form
      form={form}
      className="modal-form containerUserInfo"
      initialValues={
        user
          ? {
              username: user.username,
              name: user.name,
              surname: user.surname,
              email: user.email,
              phone: user.phone,
            }
          : {}
      }
    >
      <Form.Item label="Username:" name="username">
        <Input disabled id="username" onChange={onInputChange} />
      </Form.Item>
      <Form.Item label="Name:" name="name">
        <Input className="userInfo" id="name" onChange={onInputChange} />
      </Form.Item>
      <Form.Item
        label="Surname:"
        name="surname"
        rules={[
          {
            required: true,
            message: "Please input your surname!",
          },
        ]}
        validateStatus={validateStatus}
        hasFeedback
      >
        <Input className="userInfo" id="surname" onChange={onInputChange} />
      </Form.Item>
      <Form.Item label="Mail:" name="email">
        <Input
          className="userInfo"
          id="email"
          onChange={onInputChange}
          type="email"
        />
      </Form.Item>
      <Form.Item label="Phone:" name="phone">
        <Input
          className="userInfo"
          id="phone"
          onChange={onInputChange}
          type="tel"
        />
      </Form.Item>
      {user && (
        <Card
          title={user.role.name}
          style={{ marginLeft: "20%", marginTop: 16, width: 300 }}
        >
          <ul>
            {user.role.permissions.map((permission) => (
              <li style={{ color: "red", margin: "10px" }} key={permission}>
                {permission}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </Form>
  );
};

export default CustomUserEdit;
