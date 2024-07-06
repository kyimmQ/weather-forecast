import { Layout, Menu } from "antd";
import { AimOutlined } from "@ant-design/icons";
import "./App.css";
import React from "react";
import { Content, Header } from "antd/es/layout/layout";
import Weather from "./components/weather/weather.component";

function App() {
  return (
    <>
      <Layout style={{ background: "none" }} id="drag">
        <Header>
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <div className="logo" align="left">
              <img
                style={{ marginBottom: "-8px", marginLeft: "0px" }}
                src="logo.png"
                height={30}
                width={35}
                alt="menu"
              />
            </div>

            <Menu.Item icon={<AimOutlined />}>Weather App</Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding: "0 50px", marginTop: 30 }}>
          <>
            <Weather />
          </>
        </Content>
      </Layout>
    </>
  );
}

export default App;
