import {Button, Card, Form, Switch} from "antd";
import React from "react";
import {ProjectSettingStatus, SetProjectSettingStatus} from "@/pages/Modal/ProjectSettingStatus";


export default () => {
    return (
        <>
            <Card title="项目设置" bordered={false} style={{ width: "100%",marginBottom:12}}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: "80%"}}
                    initialValues={{ remember: true }}
                    onFinish={(values) => {
                        SetProjectSettingStatus("Swagger",values.Swagger)
                        SetProjectSettingStatus("Lombok",values.Lombok)
                    }}
                    autoComplete="off"
                >

                    <Form.Item initialValue={ProjectSettingStatus.Swagger} name="Swagger" label="swagger文档" valuePropName="checked">
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" checked/>
                    </Form.Item>
                    <Form.Item initialValue={ProjectSettingStatus.Lombok} name="Lombok" label="Lombok" valuePropName="checked">
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" checked/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}