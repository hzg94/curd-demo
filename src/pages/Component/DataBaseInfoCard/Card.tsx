import React, {useEffect, useState} from 'react';
import style from './Card.css'
import {Button, Divider, Input, Menu, MenuProps, Modal, Select, Table, theme} from 'antd';
import {CheckOutlined, CloseOutlined, DoubleRightOutlined, LeftOutlined} from '@ant-design/icons';
import {history, withRouter} from "umi";
import axios from 'axios';
import {LevelState} from "@/pages/Modal/PageModal";
import type {ColumnsType} from 'antd/es/table';
import CodeHighLightDiv from "@/pages/Component/CodeHighLightDiv/CodeHighLightDiv";

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
    autoIncrement: boolean,
    primaryKey:boolean,
    columnSize:number
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
        key: 'columnName',
        render:()=>{
            return (
                <>
                    <Select
                        defaultValue="auto"
                        style={{ width: 120 }}
                        options={[
                            { value: 'auto', label: 'auto' },
                            { value: 'string', label: 'string' },
                            { value: 'int', label: 'int' },
                            { value: 'double', label: 'double' },
                            { value: 'float', label: 'float' },
                            { value: 'date', label: 'date' },
                            { value: 'enum', label: 'enum' },
                            { value: 'boolean', label: 'boolean' },
                        ]}
                    />
                </>
            )
        }
    },
    {
        title: '长度',
        dataIndex: 'columnSize',
        key: 'columnName',
        render:(_, {columnSize})=>{
            return (
                <Input maxLength={3} style={{width:"50px"}} defaultValue={columnSize} />
            )
        }
    },
    {
        title: '不能为空',
        key: 'nullAble',
        dataIndex: 'columnName',
        render: (_, {nullAble}) => {
            if (nullAble) {
                return <CheckOutlined/>;
            } else {
                return <CloseOutlined/>;
            }
        },
    },
    {
        title: '主键',
        key: 'primaryKey',
        dataIndex: 'columnName',
        render: (_, {primaryKey}) => {
            if (primaryKey) {
                return <CheckOutlined/>;
            } else {
                return <CloseOutlined/>;
            }
        },
    },
    {
        title: '自动递增',
        key: 'autoIncrement',
        dataIndex: 'columnName',
        render: (_, {autoIncrement}) => {
            if (autoIncrement) {
                return <CheckOutlined/>;
            } else {
                return <CloseOutlined/>;
            }
        },
    }
];

const { useToken } = theme;

export default withRouter((props) => {

    const { token } = useToken();

    let [TableName, SetTableName] = useState<string>('null')

    let [DataBaseName, SetDataBaseName] = useState<string>('test')

    let [MenuItem, SetMenuItem] = useState<Array<any>>([])

    let [TableInfo, SetTableInfo] = useState<Array<any>>([])

    const [isModalOpen, setIsModalOpen] = useState(false);

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
        //分析url
        const url = props.location?.pathname.split('/') as Array<string>
        const DataBaseName = url[3]
        //记忆
        const MenuSelect = window.localStorage.getItem('MenuSelect')
        if (MenuSelect != null) {
            SetTableName(MenuSelect)
            axios.get(`/api/ma/testTableEX?database=${DataBaseName}&table=${MenuSelect}`).then(res => {
                SetTableInfo(res.data.tableColumns)
            })
            LevelState.Level = 3
        }
        SetDataBaseName(DataBaseName)
        if (url.length == 5) {
            const TableName = url[4]
            SetTableName(TableName)
        }
        //异步数据库获取
        axios.get('/api/ma/testTable?database=' + DataBaseName).then(res => {
            let ItemList: Array<MenuItem> = []
            res.data.forEach((data: any, index: number) => {
                ItemList.push(
                    getItem(data, data, null)
                )
            })
            SetMenuItem([
                getItem(DataBaseName, 'Top', null, ItemList),
            ])
        })
    }, [])


    return (
        <div className={style.demo} style={{border: "1px solid "+token.colorBorder}}>
            <div className={style.HeadDiv}>
                <Button className={style.HeadBackButton} onClick={() => {
                    history.push('/databases/')
                }} shape="circle" icon={<LeftOutlined/>}/>
                <span className={style.HeadTitle} style={{color:token.colorText}}>
                    <>
                        数据库:{DataBaseName}
                        {
                            LevelState.Level == 3 ? <><DoubleRightOutlined
                                style={{fontSize: "16px"}}/>{TableName}</> : <></>
                        }
                    </>
            </span>
                <Modal width="500" title="代码预览" open={isModalOpen} onOk={_=> {
                    setIsModalOpen(false)
                }}
                       onCancel={_ => setIsModalOpen(false)} cancelText="关闭" okText="test">
                    <CodeHighLightDiv database={DataBaseName}  tableName={TableName}/>
                </Modal>
                <div className={style.HeadActionDiv}>
                    {
                        LevelState.Level == 3 ? <>
                            <Button style={{marginRight: "10px"}} onClick={_ => setIsModalOpen(true)}>生成</Button>
                            <Button style={{marginRight: "10px"}} onClick={CloseTable}>关闭数据表</Button>
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
                            <Table style={{overflowY:"scroll",height:"70vh"}} rowKey={x => x.columnName} columns={columns} dataSource={TableInfo}/>
                        </> : <></>
                    }
                </div>
            </div>
        </div>
    )
});


