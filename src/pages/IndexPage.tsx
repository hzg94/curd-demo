import {Card, Layout, Tag, theme} from "antd";
import {HomeOutlined} from "@ant-design/icons";

import React from "react";
import {ProjectSettingStatus} from "@/pages/Modal/ProjectSettingStatus";

const {Header, Content, Footer} = Layout;
const { useToken } = theme;
export default () => {
    const { token } = useToken();
    return (
        <>
            <Header style={{padding: 0,background:token.colorBgContainer}}>
                <p style={{fontSize: "24px", marginLeft: "12px", marginTop: 0, marginBottom: 0}}>
                    <HomeOutlined/>
                    <span style={{marginLeft: "12px"}}>主页</span>
                </p>
            </Header>
            <Content style={{margin: '0 16px'}}>
                <Card title={
                    <>
                        应用名称:{ProjectSettingStatus.ProjectName}
                        <Tag color="green">开发中</Tag>
                    </>}
                      bordered={false} style={{width: "100%", marginTop: 12}}>
                    <p>该项目目前为了快速生成CURD类代码</p>
                    <p>此项目已有 10 模型</p>
                    <p>此项目已有 10 接口</p>
                </Card>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
        </>
    )
}