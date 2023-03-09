import React, {useState} from 'react';
import {ApiOutlined, HomeOutlined, KeyOutlined, PieChartOutlined, SettingOutlined,} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {ConfigProvider, Layout, Menu, theme} from 'antd';
import {history, useRoutes} from "umi";
import Index from './DataBasesManager'
import ModalManager from "@/pages/ModalManager";
import IndexPage from "@/pages/IndexPage";
import InterFaceGenerator from '@/pages/InterFaceGenerator';
import SettingPage from "@/pages/SettingPage";
import {ProjectSettingStatus} from "@/pages/Modal/ProjectSettingStatus";
import {useSnapshot} from 'valtio';

const {Sider} = Layout;

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
    getItem('主页', '0', <HomeOutlined/>),
    getItem('数据库管理', '1', <SettingOutlined/>),
    getItem('模型生成', '2', <PieChartOutlined/>),
    getItem('接口生成', '3', <ApiOutlined/>),
    getItem('权限管理', '4', <KeyOutlined/>),
    getItem('项目设置', '5', <SettingOutlined/>)
];


const Routes = [
    {
        path: "/",
        element: <IndexPage/>
    },
    {
        path: "/databases/*",
        element: <Index/>
    },
    {
        path: "/modal/*",
        element: <ModalManager/>
    },
    {
        path: "/interface/*",
        element: <InterFaceGenerator/>
    },
    {
        path: "/auth/*",
        element: "s"
    },
    {
        path: "/setting",
        element: <SettingPage/>
    }
]

const ReturnSelectKey = () => {
    let SelectKey = "0"
    if (window.location.pathname == '/') {
        return SelectKey
    }
    let url = window.location.pathname.split("/")[1] as string
    Routes.forEach((value, index) => {
        let Rurl = value.path.split("/")[1] as string
        if (Rurl == url) {
            SelectKey = index + ""
            return
        }
    })
    return SelectKey
}

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const demo = useSnapshot(ProjectSettingStatus)


    return (
        <ConfigProvider
            theme={{
                algorithm: Reflect.get(theme, demo.ProjectTheme)
            }}>
            <Layout style={{minHeight: '100vh'}}>
                <Sider theme={"light"} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div style={{
                        height: 32,
                        margin: 16,
                        color: "skyblue",
                        fontSize: "24px",
                        display: "inline-block"
                    }}>Fast
                    </div>
                    {
                        //动态显示
                        !collapsed ?
                            <div style={{
                                height: 32,
                                color: "skyblue",
                                fontSize: "24px",
                                display: "inline-block"
                            }}>Crud</div> : <></>
                    }
                    <Menu defaultSelectedKeys={[ReturnSelectKey()]} onSelect={e => {
                        let key = parseInt(e.key)
                        if (key < Routes.length) {
                            let url: string = Routes[key].path.at(-1) == '*' ? Routes[key].path.slice(0, -1) :
                                Routes[key].path
                            history.push(url)
                        }
                    }} mode="inline" items={items}/>
                </Sider>
                <Layout className="site-layout">
                    {
                        useRoutes(Routes)
                    }
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default App;