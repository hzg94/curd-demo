import React, {useState} from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {useRoutes} from 'umi';
import {Breadcrumb, Layout, Menu} from 'antd';
import DataBaseCard from "@/pages/Component/DataBaseCard/DataBaseCard";
import Card from './Component/Debug/Card';

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('模型生成', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>)
];

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{height: 32, margin: 16, color: "skyblue", fontSize: "24px"}}>CURD_DEMO</div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            <Layout className="site-layout">
                <Header style={{padding: 0}}>
                    <p style={{color: "white", fontSize: "24px", marginLeft: "12px", marginTop: 0, marginBottom: 0}}>
                        <PieChartOutlined/>
                        <span style={{marginLeft: "12px"}}>模型生成</span>
                    </p>
                </Header>
                <Content style={{margin: '0 16px'}}>
                    {
                        useRoutes([
                            {
                                path: "/",
                                element: <DataBaseCard/>,
                            },
                            {
                                path: "debug",
                                element: <Card/>,
                            },
                        ])
                    }
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default App;