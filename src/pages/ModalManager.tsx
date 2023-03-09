import {PieChartOutlined} from "@ant-design/icons";
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
                    <PieChartOutlined/>
                    <span style={{marginLeft: "12px"}}>模型生成</span>
                </p>
            </Header>
            <Content style={{marginTop: 12}}>

            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
        </>
    )
}