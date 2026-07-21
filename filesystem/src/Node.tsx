import './App.css'
import Node from './fileClasses/Node'
import openSVG from './assets/folder2-open.svg'
import closeSVG from './assets/folder2.svg'
import fileSVG from './assets/file-earmark.svg'
type Data = {
    data:Node,
    indent:string,
    type:string,
    isLast:boolean | null,
    reload:boolean
}
import {useState,useEffect} from 'react'
export default function NodeElement({data,type,indent,isLast,reload}:Data){
    const [expand,setExpand] = useState(false)
    const [branch,setBranch] = useState<boolean|null|undefined>(undefined)
    function checkBranch(){
        if(isLast !== null){
            if(isLast === true){
                setBranch(true)
            } else{
                setBranch(false)
            }
        } else {
            setBranch(null)
        }
    }
    useEffect(()=>{
        checkBranch()
    },[])
    return (
        <div className='font-mono whitespace-pre'>
            {branch !== undefined && (
                <div>
                    {type === 'FOLDER' && branch !== null && (
                        <button className='flex items-center gap-0 hover:cursor-pointer' title={data.path} onClick={()=>setExpand(expand => !expand)}>{indent + (isLast === true ? '└── ' : '├── ')}<img src={expand === false ? closeSVG : openSVG}></img>{data.name}</button>
                    )}
                    {type === 'FOLDER' && branch === null && (
                        <button className='flex items-center gap-0 hover:cursor-pointer' title={data.path} onClick={()=>setExpand(expand => !expand)}><img src={expand === false ? closeSVG : openSVG}></img>{data.name}</button>
                    )}
                    {type === 'FILE' && branch !== null && (
                        <button title={data.path} className='flex items-center gap-0 hover:cursor-pointer'>{indent + (isLast === true ? '└── ' : '├── ')}<img src={fileSVG}></img>{data.name}</button>
                    )}
                    {type === 'FILE' && branch === null && (
                        <button title={data.path} className='flex items-center gap-0 hover:cursor-pointer'><img src={fileSVG}></img>{data.name}</button>
                    )}
                    {expand === true && branch !== null && reload === false && (
                        <div>
                            {data.children.map((val,idx)=>
                                <NodeElement key={idx} data={val} indent={indent + (isLast === true ? '    ' : '│   ')} type={val.type} isLast={idx === data.children.length - 1} reload={reload}/>
                            )}
                        </div>
                    )}
                    {expand === true && branch === null && reload === false && (
                        <div>
                            {data.children.map((val,idx)=>
                                <NodeElement key={idx} data={val} indent={indent} type={val.type} isLast={idx === data.children.length - 1} reload={reload}/>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}