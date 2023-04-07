import React, { useEffect, useState } from "react";
import { Collapse, Button, Input, Form } from "antd";
import { Role } from "../../../store/types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import {
  addNewPermission,
  addNewRole,
  deleteCurrentPermission,
  deleteCurrentRole,
} from "../../../store/reducers/rolesReducers";

const { Panel } = Collapse;

interface RolesAccordionProps {
  roles: Role[];
}

const RolesAccordion: React.FC<RolesAccordionProps> = ({ roles }) => {
  const [allRoles, setRoles] = useState<Role[]>(roles);
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const [form] = Form.useForm();
  const [secondForm] = Form.useForm();

  useEffect(() => {
    setRoles(roles);
  }, [roles]);

  const onFinish = (values: any) => {
    const newRoleId = allRoles.length + 1;
    const newRole = {
      id: newRoleId,
      name: values.roleName,
      permissions: [],
    };
    dispatch(addNewRole(newRole));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const addPermission = (roleId: string) => {
    secondForm.validateFields(["permissionName"]).then((values) => {
      const permission: string = values.permissionName;
      dispatch(addNewPermission({ roleId, permission }));
      secondForm.resetFields(["permissionName"]);
    });
  };
  const deletePermission = (roleId: string, permissionId: string) => {
    dispatch(deleteCurrentPermission({ roleId, permissionId }));
  };

  const deleteRole = (roleId: any) => {
    dispatch(deleteCurrentRole(roleId));
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={{ required: "This field is required!" }}
      >
        <Form.Item
          name="roleName"
          rules={[{ required: true }]}
          style={{ marginBottom: "20px" }}
        >
          <Input placeholder="Enter role name" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginBottom: "20px" }}
          block
        >
          Add Role
        </Button>
      </Form>
      <Collapse defaultActiveKey={[""]}>
        {allRoles.map((role, roleIndex) => (
          <Panel header={role.name} key={role.id}>
            <ul>
              {role.permissions.map((permission, permissionIndex) => (
                <li style={{ margin: "15px" }} key={permissionIndex}>
                  {permission}
                  <Button
                    style={{ marginLeft: "15px" }}
                    danger
                    onClick={() =>
                      deletePermission(role.id.toString(), permission)
                    }
                  >
                    Delete Permission
                  </Button>
                </li>
              ))}
            </ul>
            <Form
              form={secondForm}
              onFinish={() => addPermission(role.id.toString())}
              onFinishFailed={onFinishFailed}
              validateMessages={{ required: "This field is required!" }}
            >
              <Form.Item
                name="permissionName"
                rules={[{ required: true }]}
                style={{ marginBottom: "20px" }}
              >
                <Input placeholder="Enter permission name" />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                Add Permission
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                type="primary"
                danger
                onClick={() => deleteRole(role.id)}
              >
                Delete Role
              </Button>
            </Form>
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default RolesAccordion;
