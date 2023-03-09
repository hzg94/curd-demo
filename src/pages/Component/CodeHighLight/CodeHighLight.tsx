import {useEffect, useState} from "react";
import hljs, {HLJSOptions} from 'highlight.js'
import 'highlight.js/styles/vs2015.css'


interface CodeHighLightProps{
    Code:string,
    language:"java"|"js"|"scala",
    options?:Partial<HLJSOptions>
}

export default (props:CodeHighLightProps) => {


    const [CodeHtml,SetCodeHtml] = useState<string>("")

    useEffect(()=> {
        console.log(props)
        if(props.options != null){
            hljs.configure(props.options)
        }
        const code = hljs.highlight(props.Code,{language:props.language})
        SetCodeHtml(code.value)
    },[props.Code])

    return (
        <>
            <div dangerouslySetInnerHTML={{__html:CodeHtml}} style={{color:"skyblue",whiteSpace:"pre",border:"1px solid #595959"}}>
            </div>
        </>
    )
}