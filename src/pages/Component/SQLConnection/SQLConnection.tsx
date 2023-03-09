import {Button, Card, Form, Input, message} from "antd";
import {ProjectSettingStatus, SetProjectSettingStatus} from "@/pages/Modal/ProjectSettingStatus";
import React, {useState} from "react";
import axios from "axios";
import {CheckCircleTwoTone, CloseCircleTwoTone} from "@ant-design/icons";


export default () => {

    const [form] = Form.useForm();

    const [DataBaseStatus, SetDataBaseStatus] = useState<boolean>(false)

    return (
        <>
            <Card title="数据库设置" bordered={false} style={{width: "100%", marginBottom: 12}}
                  extra={DataBaseStatus ? <CheckCircleTwoTone twoToneColor="#52c41a"/> :
                      <CloseCircleTwoTone twoToneColor="#F00"/>}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: "80%"}}
                    initialValues={{
                        host: ProjectSettingStatus.host,
                        database: ProjectSettingStatus.database,
                        user: ProjectSettingStatus.user,
                        password: ProjectSettingStatus.password
                    }}
                    onFinish={(values) => {
                        if (DataBaseStatus) {
                            SetProjectSettingStatus("host", values.host)
                            SetProjectSettingStatus("user", values.user)
                            SetProjectSettingStatus("password", values.password)
                            SetProjectSettingStatus("database", values.database)
                        } else {
                            message.error("请先测试数据库连接")
                        }
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="数据库连接ip"
                        name="host"
                        rules={[{required: true, message: '请输入你的项目名称!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="数据库"
                        name="database"
                        rules={[{required: true, message: '请输入你的项目名称!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="用户"
                        name="user"
                        rules={[{required: true, message: '请输入你的项目名称!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{required: true, message: '请输入你的项目名称!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button style={{marginRight: 12}} onClick={() => {
                            form.validateFields().then((values) => {
                                axios.get("/api/ma/testConn", {
                                    params: {
                                        ip: values.host,
                                        database: values.database,
                                        username: values.user,
                                        password: values.password
                                    }
                                }).then(_ => SetDataBaseStatus(true))
                                    .catch(_ => SetDataBaseStatus(false))
                            })
                        }}>
                            测试
                        </Button>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}
