import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

interface LoginProps {
  onFinish: (values: { username: string; password: string }) => void;
  error: string | null;
}

const Login: React.FC<LoginProps> = ({ onFinish, error }) => {
  const history = useHistory();
  const user = useSelector((state: RootState) => state.loginSlice.user);
  const [err, setErr] = useState(error);

  useEffect(() => {
    const token = Cookies.get("token");
    if (user && token) {
      history.push("/dashboard");
    }
  }, [history, user]);

  const handleFinish = (values: any) => {
    onFinish({
      username: values.username,
      password: values.password,
    });
  };

  const handleInputChange = () => {
    err && setErr("");
  };

  return (
    <>
      <Form
        name="login"
        onFinish={handleFinish}
        initialValues={{ remember: true }}
        style={{ maxWidth: 300 }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
          validateStatus={err ? "error" : undefined}
          help={err}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          validateStatus={err ? "error" : undefined}
          help={err}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
