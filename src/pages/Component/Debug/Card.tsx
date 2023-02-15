import React, {useEffect} from 'react';
import style from './Card.css'
import {Button, Divider, Menu} from 'antd';
import type {MenuProps} from 'antd';
import {DoubleRightOutlined, LeftOutlined} from '@ant-design/icons';
import {Link, withRouter} from "umi";
import {RouteComponentProps} from "@umijs/renderer-react";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('Koa', 'sub1', null, [
        getItem('User', 'g1', null),
    ]),
];

const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
};

export default withRouter((props: RouteComponentProps) => {
    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <div className={style.demo}>
            <div className={style.HeadDiv}>
                <Button className={style.HeadBackButton} onClick={() => {
                    history.go(-1)
                }} shape="circle" icon={<LeftOutlined/>}/>
                <span className={style.HeadTitle}>
                    <Link prefetch to={'/debug'}>数据库:Koa</Link>
                    <DoubleRightOutlined style={{fontSize: "16px"}}/>
                    User
            </span>
                <div className={style.HeadActionDiv}>
                    <Button type="primary">生成</Button>
                </div>
            </div>
            <Divider className={style.HeadDivider}/>
            <div className={style.BodyDiv}>
                <div className={style.BodyLeftDiv}>
                    <Menu
                        onClick={onClick}
                        style={{width: 256}}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                    />
                </div>
                <Divider className={style.BodyDivider} type="vertical"/>
                <div className={style.BodyRightDiv}>
                    这是施工区
                </div>
            </div>
        </div>
    )
});


