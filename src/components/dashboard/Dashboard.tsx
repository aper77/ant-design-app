import React, { useState } from "react";
import { Layout, Menu, Button, Modal } from "antd";
import Cookies from "js-cookie";
import { sideBarData } from "./routesConfig";
import "../../styles/Dashboard.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import HomePage from "../routes/home/HomePage";
import MarketsPage from "../routes/markets/MarketsPage";
import UsersPage from "../routes/users/UsersPage";
import GamesPage from "../routes/games/GamesPage";
import DashboardUserModal from "./DashboardUserModal";
import DashboardSettingsModal from "./DashboardSettingsModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import RolesPage from "../routes/roles/RolesPage";

interface DashboardProps {}

const { Header, Content, Sider } = Layout;

const Dashboard: React.FC<DashboardProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState({
    title: "",
    isOpen: false,
  });
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const user = useSelector((state: RootState) => state.loginSlice.user);

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider>
          <div className="logo" />
          <Menu
            className={"sidebar"}
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
          >
            {sideBarData.map((item, index) => (
              <Menu.Item key={index + 1}>
                <Link to={item.path}>{item.title}</Link>
              </Menu.Item>
            ))}
            <div
              style={{ position: "absolute", bottom: "10px", width: "100%" }}
            >
              <div style={{ margin: "0 auto", width: "70%" }}>
                <Button type="primary" danger block onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div style={{ float: "right", paddingRight: "20px" }}>
              <Button
                className="header-item"
                onClick={() =>
                  setIsModalVisible({
                    title: "User Info",
                    isOpen: true,
                  })
                }
              >
                User Info
              </Button>
              <Button
                className="header-item"
                onClick={() =>
                  setIsModalVisible({
                    title: "Settings",
                    isOpen: true,
                  })
                }
              >
                Settings
              </Button>
            </div>
          </Header>
          <Modal
            title="Logout"
            onCancel={() => setShowLogoutConfirmation(false)}
            visible={showLogoutConfirmation}
            footer={[
              <Button
                type="primary"
                onClick={() => setShowLogoutConfirmation(false)}
              >
                Back to page
              </Button>,
              <Button
                danger
                type="primary"
                onClick={() => {
                  Cookies.remove("token");
                  window.location.reload();
                }}
              >
                Logout
              </Button>,
            ]}
          >
            <p>Are you sure you want to logout?</p>
          </Modal>
          <Content style={{ backgroundColor: "#dfe1e5" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Switch>
                <Route exact path="/dashboard">
                  <Redirect to="/dashboard/home" />
                </Route>
                <Route path="/dashboard/home" component={HomePage} />
                <Route path="/dashboard/markets" component={MarketsPage} />
                <Route
                  path="/dashboard/markets"
                  render={(props) => <MarketsPage userId={"updateUser"} />}
                />
                <Route path="/dashboard/users" component={UsersPage} />
                <Route path="/dashboard/games" component={GamesPage} />
                <Route path="/dashboard/roles" component={RolesPage} />
              </Switch>
            </div>
          </Content>
        </Layout>
        {isModalVisible.title === "User Info" ? (
          <DashboardUserModal
            user={user}
            isModalVisible={isModalVisible}
            onCloseModal={() =>
              setIsModalVisible({
                title: "",
                isOpen: false,
              })
            }
          />
        ) : (
          <DashboardSettingsModal
            isModalVisible={isModalVisible}
            onCloseModal={() =>
              setIsModalVisible({
                title: "",
                isOpen: false,
              })
            }
          />
        )}
      </Layout>
    </Router>
  );
};

export default Dashboard;
