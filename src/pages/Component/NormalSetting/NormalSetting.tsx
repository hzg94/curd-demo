import {Button, Card, Form, Input, Switch} from "antd";
import React from "react";
import {ProjectSettingStatus, SetProjectSettingStatus} from "@/pages/Modal/ProjectSettingStatus";


export default () => {
    return (
        <>
            <Card title="项目普通设置" bordered={false} style={{ width: "100%",marginBottom:12}}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: "80%"}}
                    initialValues={{ remember: true }}
                    onFinish={(values:any) => {
                        SetProjectSettingStatus("ProjectName",values.name)
                        if (values.darkTheme){
                            SetProjectSettingStatus("ProjectTheme","darkAlgorithm")
                        }else{
                            SetProjectSettingStatus("ProjectTheme","defaultAlgorithm")
                        }
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="项目名称"
                        name="name"
                        rules={[{ required: true, message: '请输入你的项目名称!' }]}
                        initialValue={ProjectSettingStatus.ProjectName}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item initialValue={ProjectSettingStatus.ProjectTheme == "darkAlgorithm"} name="darkTheme" label="夜间模式" valuePropName="checked">
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