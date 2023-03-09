import {ApiOutlined} from "@ant-design/icons";
import React from "react";
import {Layout, theme} from "antd";
import NormalSetting from "@/pages/Component/NormalSetting/NormalSetting";
import ProjectSetting from "@/pages/Component/ProjectSetting/ProjectSetting";
import SQLConnection from "@/pages/Component/SQLConnection/SQLConnection";

const {Header, Content, Footer} = Layout;
const { useToken } = theme;
export default () => {
    const { token } = useToken();
    return (
        <>
            <Header style={{padding: 0,background:token.colorBgContainer}}>
                <p style={{ fontSize: "24px", marginLeft: "12px", marginTop: 0, marginBottom: 0}}>
                    <ApiOutlined />
                    <span style={{marginLeft: "12px"}}>设置</span>
                </p>
            </Header>
            <Content style={{marginTop: 12,marginLeft:16,marginRight:16}}>
                <NormalSetting/>
                <ProjectSetting/>
                <SQLConnection/>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
        </>
    )
}