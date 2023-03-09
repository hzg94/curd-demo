import React, {useEffect, useRef, useState} from "react";
import {Cascader} from "antd";
import {NodeIndexOutlined} from "@ant-design/icons";
import axios from "axios";

export default ()=>{

    const [FirstData,SetFirstData] = useState<Option[]>()

    const [SecondData,SetSecondData] = useState<Option[]>()

    const ref = useRef<ModalFirst>({})

    const columnStatus = useRef<ColumnStatus>()

    useEffect(() => {

        axios.get('/api/ma/DataListAll?database=bigdata').then(x => {
            let OptionList:Option[] = []
            x.data.data.forEach((x:any) => {
                OptionList.push(GenOption(x))
            })
            console.log(OptionList)
            SetFirstData(OptionList)
        })
    },[])

    const SettingRef = (position:number,type:string) => {
        if (position == 1) {
            ref.current.ColumnFirstLeft = type
            if (ref.current.ColumnFirstRight == null) columnStatus.current = ColumnStatus.Warning
        }else if (position == 2){
            ref.current.ColumnFirstRight = type
            if (ref.current.ColumnFirstLeft == null) columnStatus.current = ColumnStatus.Warning
        }
        if (ref.current.ColumnFirstRight == ref.current.ColumnFirstLeft){
            columnStatus.current = ColumnStatus.Success
        }else {
            columnStatus.current =ColumnStatus.Error
        }
    }

    const SearchData = (FirstPath:string,SecondPath:string) => {

    }

    return (
        <>
            <div>
                <Cascader options={FirstData} onChange={(e) => {
                    let DataTemp = {...FirstData}
                    FirstData?.forEach( x => {
                        if(x.value == e[0]){
                            x.children?.forEach(x => {
                                if (x.ColumnType == e[1]) SettingRef(1,x.ColumnType)
                            })
                        }
                    })
                }} placeholder="请输入字段!" />
                <NodeIndexOutlined />
                <Cascader options={SecondData} onChange={(e) => {
                    FirstData?.forEach( x => {
                        if(x.value == e[0]){
                            x.children?.forEach(x => {
                                if (x.ColumnType == e[1]) SettingRef(2,x.ColumnType)
                            })
                        }
                    })
                }} placeholder="请输入字段!" />
            </div>

        </>
    )
}

enum ColumnStatus {
    Warning,
    Error,
    Success
}

interface Option {
    value: string | number;
    label: string;
    ColumnType?:string
    children?: Option[];
}


interface ColumnType{
    ColumnName:string,
    ColumnType:string
}

interface ModalFirst {
    ColumnFirstLeft?:string,
    ColumnFirstRight?:string
}

const GenOption = (value:any):Option => {
    let children = value.tableColumns.map((x:ColumnType) => {
        return {
            value: x.ColumnName,
            label: x.ColumnName,
            ColumnType: x.ColumnType
        }
    })
    return {
        value:value.tableName,
        label:value.tableName,
        children:children
    }
}