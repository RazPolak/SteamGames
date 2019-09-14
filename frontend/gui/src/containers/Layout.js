import { Layout, Menu, Breadcrumb } from "antd";
import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const { Header, Content, Footer } = Layout;

const cookies = new Cookies();
const loggedIn = () => {
  const jwt = cookies.get("jwt_access");
  console.log(jwt);
  if (jwt === undefined) {
    return false;
  }
  return true;
};

const signoutHandler = () => {
  console.log("inside signoutHandler");
  cookies.remove("jwt_access");
  cookies.remove("jwt_refresh");
  console.log(cookies.getAll());
};

const UserOptions = props => {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/favorites">Favorites</Breadcrumb.Item>
      <Breadcrumb.Item onClick={signoutHandler} href="/">
        Sign Out
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

const UnknownOptions = props => {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/register">Create Account</Breadcrumb.Item>
      <Breadcrumb.Item href="/signin">Sign In</Breadcrumb.Item>
    </Breadcrumb>
  );
};

let menuOptions;
if (loggedIn()) {
  menuOptions = <UserOptions />;
} else {
  menuOptions = <UnknownOptions />;
}

const CustomLayout = props => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        {menuOptions}
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default CustomLayout;
