import React, { useState } from "react";
import style from "./App.module.css";

import { Menu } from "./components/menu";
import { AuthContainer } from "./components/Auth/AuthContainer";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  Button,
  Col,
  ConfigProvider,
  Row,
  Space,
  Switch,
  theme,
  Layout,
} from "antd";
import { MoonFilled, MoonOutlined } from "@ant-design/icons";
import { HomeContainer } from "./components/Home/Home";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />}>
        <Route index element={<HomeContainer />} />
        <Route path="registration" element={<AuthContainer />} />
        <Route path="login" element={<AuthContainer />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  paddingInline: 48,
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  height: "calc(64px - 10%)",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  borderRadius: 6,
};

const layoutStyle = {
  borderRadius: 8,
  height: "100%",
};

const Root = () => {
  const [lightTheme, setLightTheme] = useState(true);
  const onChangeSwitch = (e: boolean) => {
    setLightTheme(e);
  };
  return (
    <ConfigProvider
      theme={{
        algorithm: lightTheme ? theme.defaultAlgorithm : theme.darkAlgorithm,
        token: {
          colorText: lightTheme ? "#112D4E" : "#EEEEEE",
          colorBgBase: lightTheme ? "#fff" : "#222831",
        },
        components: {
          Layout: {
            headerBg: lightTheme ? "#a4daff" : "#0a0a23",
            footerBg: lightTheme ? "#a4daff" : "#0a0a23",
          },
        },
      }}
    >
      <div className={lightTheme ? style.lightTheme : style.darkTheme}>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <Row justify="space-between">
              <Col>
                <Menu />
              </Col>
              <Col>
                <Space>
                  <Switch
                    unCheckedChildren={<MoonFilled />}
                    checkedChildren={<MoonOutlined />}
                    defaultChecked
                    onChange={onChangeSwitch}
                  />
                  <Button type="primary">Declined</Button>
                </Space>
              </Col>
            </Row>
          </Header>
          <Content style={contentStyle}>
            <Outlet />
          </Content>
          <Footer style={footerStyle}>toron2c(c.)</Footer>
        </Layout>
      </div>
    </ConfigProvider>
  );
};
