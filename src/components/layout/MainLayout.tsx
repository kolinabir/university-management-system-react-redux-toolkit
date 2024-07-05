import { Layout, Menu, MenuProps } from "antd";
const { Header, Content, Footer, Sider } = Layout;

import { createElement } from "react";
import { Outlet } from "react-router-dom";
const items: MenuProps["items"] = [
  {
    key: "asdaddsdas",
    label: "Dashboard",
  },
  {
    key: "asdaasdsdas",
    label: "Profile",
  },
  {
    key: "asdgasdas",
    label: "User Management",
    children: [
      {
        key: 1,
        label: "Create Admin",
      },
      {
        key: 2,
        label: "Create Student",
      },
    ],
  },
];
const MainLayout = () => {
  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            color: "white",
            width: "100%",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20 px",
          }}
          className=""
        >
          Uni Management
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              //   background: colorBgContainer,
              //   borderRadius: borderRadiusLG,
            }}
          >
            <Outlet></Outlet>
            {/* <h1>The Main Content should appear herer</h1> */}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
