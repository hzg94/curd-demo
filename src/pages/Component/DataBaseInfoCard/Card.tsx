import React, {useEffect, useState} from 'react';
import style from './Card.css'
import {Button, Divider, Menu, Table} from 'antd';
import type {MenuProps} from 'antd';
import {CheckOutlined, CloseOutlined, DoubleRightOutlined, KeyOutlined, LeftOutlined} from '@ant-design/icons';
import {withRouter} from "umi";
import {history} from "umi";
import axios from 'axios';
import {LevelState} from "@/pages/Modal/PageModal";
import type {ColumnsType} from 'antd/es/table';

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

interface DataType {
    nullAble: boolean,
    autoIncrement: boolean
}

const columns: ColumnsType<DataType> = [
    {
        title: '名',
        dataIndex: 'columnName',
        key: 'columnName'
    },
    {
        title: '类型',
        dataIndex: 'columnType',
        key: 'columnType',
    },
    {
        title: '长度',
        dataIndex: 'columnSize',
        key: 'columnSize',
    },
    {
        title: '不能为空',
        key: 'nullAble',
        dataIndex: 'nullAble',
        render: (_, {nullAble}) => {
            if (nullAble) {
                return <CheckOutlined/>;
            } else {
                return <CloseOutlined/>;
            }
        },
    },
    {
        title: '自动递增',
        key: 'autoIncrement',
        dataIndex: 'autoIncrement',
        render: (_, {autoIncrement}) => {
            if (autoIncrement) {
                return <CheckOutlined/>;
            } else {
                return <CloseOutlined/>;
            }
        },
    },
    {
        title: '注释',
        key: 'columnRemarks',
        dataIndex: 'columnRemarks'
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <a>
                1
            </a>
        ),
    },
];


export default withRouter((props) => {

    let [TableName, SetTableName] = useState<string>('null')

    let [DataBaseName, SetDataBaseName] = useState<string>('test')

    let [MenuItem, SetMenuItem] = useState<Array<any>>([])

    let [TableInfo, SetTableInfo] = useState<Array<any>>([])

    const OpenTable = (TableName: string) => {
        axios.get(`/api/ma/testTableEX?database=${DataBaseName}&table=${TableName}`).then(res => {
            SetTableInfo(res.data.tableColumns)
            console.log(res.data)
            console.log(res.data.tableColumns)
        })
        LevelState.Level = 3
        SetTableName(TableName)
        window.localStorage.setItem('MenuSelect', TableName)
    }

    const CloseTable = () => {
        LevelState.Level = 2
        window.localStorage.removeItem("MenuSelect")
        SetTableName('test')
    }


    useEffect(() => {
        //记忆
        const MenuSelect = window.localStorage.getItem('MenuSelect')
        if (MenuSelect != null) {
            SetTableName(MenuSelect)
        }
        //分析url
        const url = props.location?.pathname.split('/') as Array<string>
        SetDataBaseName(url[2])
        if (url.length == 4) {
            SetTableName(url[3])
        }
        //异步数据库获取
        axios.get('/api/ma/testTable?database=' + url[2]).then(res => {
            let ItemList: Array<MenuItem> = []
            res.data.forEach((data: any, index: number) => {
                ItemList.push(
                    getItem(data, data, null)
                )
            })
            SetMenuItem([
                getItem(url[2], 'Top', null, ItemList),
            ])
        })
    }, [])


    return (
        <div className={style.demo}>
            <div className={style.HeadDiv}>
                <Button className={style.HeadBackButton} onClick={() => {
                    history.push('/')
                }} shape="circle" icon={<LeftOutlined/>}/>
                <span className={style.HeadTitle}>
                    <>
                        数据库:{DataBaseName}
                        {
                            LevelState.Level == 3 ? <><DoubleRightOutlined
                                style={{fontSize: "16px"}}/>{TableName}</> : <></>
                        }
                    </>
            </span>
                <div className={style.HeadActionDiv}>
                    {
                        LevelState.Level == 3 ? <>
                            <Button style={{marginRight: "10px"}} onClick={CloseTable}>关闭数据表</Button>
                            <Button style={{marginRight: "10px"}}>生成</Button>
                        </> : <></>
                    }
                </div>
            </div>
            <Divider className={style.HeadDivider}/>
            <div className={style.BodyDiv}>
                <div className={style.BodyLeftDiv}>
                    <Menu
                        onClick={e => OpenTable(e.key)}
                        style={{width: "100%", height: "70vh", overflowY: "scroll"}}
                        defaultSelectedKeys={[window.localStorage.getItem('MenuSelect') as string]}
                        defaultOpenKeys={['Top']}
                        mode="inline"
                        items={MenuItem}
                    />
                </div>
                <Divider className={style.BodyDivider} type="vertical"/>
                <div className={style.BodyRightDiv}>
                    {
                        LevelState.Level == 3 ? <>
                            <Table columns={columns} dataSource={TableInfo}/>
                        </> : <></>
                    }
                </div>
            </div>
        </div>
    )
});


