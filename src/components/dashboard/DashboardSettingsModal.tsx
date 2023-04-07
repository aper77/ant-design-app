import React from "react";
import { Checkbox, Col, Form, Modal, Row } from "antd";
import { RootState } from "../../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/Dashboard.css";
import { setUserConfigsData } from "../../store/reducers/userConfigsReducers";

interface DashboardSettingsModalProps {
  isModalVisible: {
    title: string;
    isOpen: boolean;
  };
  onCloseModal: () => void;
}

const DashboardSettingsModal: React.FC<DashboardSettingsModalProps> = ({
  isModalVisible,
  onCloseModal,
}) => {
  const { userConfigsData } = useSelector(
    (state: RootState) => state.userConfigsSlice
  );
  const dispatch = useDispatch();

  const handleCheckboxChange = (configKey: string, newValue: boolean) => {
    if (userConfigsData !== null) {
      const updatedUserConfigsData = {
        ...userConfigsData,
        [configKey]: {
          isOpen: newValue,
          value: userConfigsData[configKey].value || "",
        },
      };
      dispatch(setUserConfigsData(updatedUserConfigsData));
    }
  };

  return (
    <Modal
      width={300}
      title={isModalVisible.title}
      visible={isModalVisible.isOpen}
      onCancel={onCloseModal}
      footer={null}
    >
      {userConfigsData && (
        <Form className="modal-form">
          <Row>
            <Col span={12}>
              <Form.Item>
                <label htmlFor="dashboard">Dashboard</label>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Checkbox
                  onChange={(e) =>
                    handleCheckboxChange("dashboard", e.target.checked)
                  }
                  checked={userConfigsData.dashboard.isOpen}
                  id="dashboard"
                  className="checkbox-left"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item>
                <label htmlFor="monitoring">Monitoring</label>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Checkbox
                  onChange={(e) =>
                    handleCheckboxChange("monitoring", e.target.checked)
                  }
                  checked={userConfigsData.monitoring.isOpen}
                  id="monitoring"
                  className="checkbox-left"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item>
                <label htmlFor="overview">Overview</label>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Checkbox
                  onChange={(e) =>
                    handleCheckboxChange("overview", e.target.checked)
                  }
                  checked={userConfigsData.overview.isOpen}
                  id="overview"
                  className="checkbox-left"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item>
                <label htmlFor="games">Games</label>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Checkbox
                  onChange={(e) =>
                    handleCheckboxChange("games", e.target.checked)
                  }
                  checked={userConfigsData.games.isOpen}
                  id="games"
                  className="checkbox-left"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item>
                <label htmlFor="users">Users</label>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Checkbox
                  onChange={(e) =>
                    handleCheckboxChange("users", e.target.checked)
                  }
                  checked={userConfigsData.users.isOpen}
                  id="users"
                  className="checkbox-left"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};

export default DashboardSettingsModal;
