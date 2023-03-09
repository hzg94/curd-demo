import {SettingOutlined} from "@ant-design/icons";
import {useRoutes} from "@@/exports";
import DataBaseCard from "@/pages/Component/DataBaseCard/DataBaseCard";
import Card from "@/pages/Component/DataBaseInfoCard/Card";
import React from "react";
import {Layout, theme} from "antd";


const {Header, Content, Footer} = Layout;

const { useToken } = theme;
export default () => {
    const { token } = useToken();
    return (
        <>
            <Header style={{padding: 0,background:token.colorBgContainer}}>
                <p style={{ fontSize: "24px", marginLeft: "12px", marginTop: 0, marginBottom: 0}}>
                    <SettingOutlined />
                    <span style={{marginLeft: "12px"}}>数据库管理</span>
                </p>
            </Header>
            <Content style={{marginTop: 12}}>
                {
                    useRoutes([
                        {
                            path: "/",
                            element: <DataBaseCard/>,
                        },
                        {
                            path: "/database/*",
                            element: <Card/>,
                        },
                    ])
                }
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
        </>
    )
}