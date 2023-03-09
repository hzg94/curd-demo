import CodeHighLight from "@/pages/Component/CodeHighLight/CodeHighLight";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {ProjectSettingStatus} from "@/pages/Modal/ProjectSettingStatus";

interface CodeHighLightProp{
    tableName:string,
    database:string,
    download?:() => void
}

export default (props:CodeHighLightProp) => {

    let [Data,SetData] = useState<string>('')

    let ref = useRef<any>()

    useEffect(() => {
        axios.get("/api/ma/getEnity",{
            params:{
                swagger:ProjectSettingStatus.Swagger,
                tableName:props.tableName || "",
                ip:ProjectSettingStatus.host,
                Lombok:ProjectSettingStatus.Lombok,
                database:props.database,
                username:ProjectSettingStatus.user,
                password:ProjectSettingStatus.password
            }
        }).then(x => {
            const CodeDownLoad = new Blob([x.data.data[0].class],{type:"application/force-download"})
            let a = document.createElement('a');
            let href = window.URL.createObjectURL(CodeDownLoad);
            a.setAttribute('href',href)
            a.setAttribute('download',x.data.data[0].entity)
            ref.current = a
            SetData(x.data.data[0].class)

        })
    },[props.tableName])

    return (
        <>
            <div style={{width:"100%",backgroundColor:"#434343"}}>
                <CodeHighLight options={{ignoreUnescapedHTML:true}}  language={"java"}
                               Code={Data}/>
            </div>
        </>
    )
}