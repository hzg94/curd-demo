import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {Button, Card, Input, List} from "antd";
import {history} from 'umi'

interface DataBaseType {
    Database: string
}

export default () => {

    const {TextArea} = Input;

    let [Data, SetData] = useState<Array<string>>([]);

    useEffect(() => {
        axios.get('/api/ma/testData').then((res: AxiosResponse<Array<DataBaseType>>) => {
            let temp: Array<string> = []
            res.data.forEach(x => {
                temp.push(x.Database)
            })
            SetData(temp)
        })

    }, [])


    return (
        <>
            <List
                grid={{
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                }}
                dataSource={Data}
                renderItem={(item,index) => (
                    <List.Item>
                        <Card title={"数据库名:" + item} style={{width: 300}} extra={
                            [<Button key={index+"B"} onClick={_ => history.push('database/' + item)}>打开</Button>]
                        }>
                            <span>备注:</span>
                            <TextArea rows={4} placeholder="test" maxLength={6}/>
                        </Card>
                    </List.Item>
                )}
            />
        </>
    )
}