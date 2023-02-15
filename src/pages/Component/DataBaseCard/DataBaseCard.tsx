import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {Button, Card, Col, Input, Row} from "antd";
import {history} from 'umi'

interface DataBaseType {
    Database: string
}

export default () => {

    const {TextArea} = Input;

    let [Data, SetData] = useState<Array<string>>([]);

    useEffect(() => {
        axios.get('http://localhost:3000').then((res: AxiosResponse<Array<DataBaseType>>) => {
            let temp: Array<string> = []
            res.data.forEach(x => {
                temp.push(x.Database)
            })
            SetData(temp)
        })

    }, [])


    return (
        <>
            <Row gutter={16}>
                {Data.map((value, index, array) => {
                    return (
                        <Col style={{marginTop: "10px"}} flex={1} key={index}>
                            <Card title={"数据库名:" + value} style={{width: 300}} extra={[
                                <Button onClick={_ => history.push('test/debug')}>打开</Button>
                            ]}>
                                <span>备注:</span>
                                <TextArea rows={4} placeholder="test" maxLength={6}/>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}